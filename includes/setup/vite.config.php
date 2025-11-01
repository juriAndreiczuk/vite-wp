<?php

if (!defined('ABSPATH')) { exit; }

class ViteConfig {
  public $dist_dir = 'dist';
  public $dist_uri;
  public $dist_path;

  const VITE_SERVER = 'http://localhost:5173';
  const VITE_ENTRY_POINT = '/src/scripts/main.ts';

  public function __construct() {
    $this->dist_uri  = get_template_directory_uri() . '/' . $this->dist_dir;
    $this->dist_path = get_template_directory()  . '/' . $this->dist_dir;
  }

  public static function init() {
    $instance = new self();
    add_action('wp_enqueue_scripts', [$instance, 'enqueue']);
    add_filter('style_loader_tag', [$instance, 'preload_main_css'], 10, 4);
  }

  public function enqueue() {
    if (VITE_ENVIRONMENT_TYPE === 'dev') {
      add_action('wp_head', [$this, 'vite_head_module_hook']);
      return;
    }

    $manifest = json_decode(file_get_contents($this->dist_path . '/manifest.json'), true);
    if (!is_array($manifest)) return;

    $entry_key = 'src/scripts/main.ts';
    if (!isset($manifest[$entry_key])) return;

    if (!empty($manifest[$entry_key]['css'][0])) {
      wp_enqueue_style('main', $this->dist_uri . '/' . $manifest[$entry_key]['css'][0], [], null, 'all');
    }

    if (!empty($manifest[$entry_key]['file'])) {
      wp_enqueue_script('main', $this->dist_uri . '/' . $manifest[$entry_key]['file'], [], null, true);
    }
  }

  public function preload_main_css(string $html, string $handle, string $href, string $media) : string {
    if ($handle !== 'main') return $html;

    $preload  = '<link rel="preload" as="style" href="' . esc_url($href) . '" onload="this.onload=null;this.rel=\'stylesheet\'">';
    $fallback = '<noscript><link rel="stylesheet" href="' . esc_url($href) . '"></noscript>';
    return $preload . $fallback;
  }

  public function vite_head_module_hook() {
    echo '<script type="module" crossorigin src="' . self::VITE_SERVER . '/@vite/client"></script>';
    echo '<script type="module" crossorigin src="' . self::VITE_SERVER . self::VITE_ENTRY_POINT . '"></script>';
  }
}
