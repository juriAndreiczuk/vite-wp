<?php

if (!defined('ABSPATH')) {
    exit;
}

class ViteConfig {
  public $dist_dir = 'dist';
  public $dist_uri;
  public $dist_path;

  const VITE_SERVER = 'http://localhost:5173';
  const VITE_ENTRY_POINT = '/src/scripts/main.js';

  public function __construct() {
    $this->dist_uri = get_template_directory_uri() . '/' . $this->dist_dir;
    $this->dist_path = get_template_directory() . '/' . $this->dist_dir;
  }

  public static function init() {
    $instance = new self();
    add_action('wp_enqueue_scripts', array($instance, 'enqueue'));
  }

  public function enqueue() {
    if (VITE_ENVIRONMENT_TYPE === 'dev') {
        add_action('wp_head', array($this, 'vite_head_module_hook'));
    } else {
      $manifest = json_decode(file_get_contents($this->dist_path . '/manifest.json'), true);
      if (is_array($manifest)) {
        wp_enqueue_style('main', $this->dist_uri . '/' . $manifest['src/scripts/main.js']['css']['0'], array(), false, 'screen');
        wp_enqueue_script('main', $this->dist_uri . '/' . $manifest['src/scripts/main.js']['file'], array(), false, true);
      }
    }
  }

  public function vite_head_module_hook() {
    echo '<script type="module" crossorigin src="' . self::VITE_SERVER . '/@vite/client"></script>';
    echo '<script type="module" crossorigin src="' . self::VITE_SERVER . self::VITE_ENTRY_POINT . '"></script>';
  }
}
