<?php

class ScriptModifier {
  public static function async_scripts($src, $handle) {
    return str_replace('#asyncload', '', $src);
  }

  public static function defer_scripts($tag, $handle, $src) {
    if (is_admin() || is_user_logged_in()) return $tag;
    if (stripos($src, '.js') === false) return $tag;

    static $deny = [
      'wp-i18n', 'wp-hooks', 'wp-element', 'wp-a11y',
      'wp-polyfill', 'jquery', 'jquery-core', 'jquery-migrate'
    ];
    if (in_array($handle, $deny, true)) return $tag;

    global $wp_scripts;
    if (isset($wp_scripts)) {
      $after = $wp_scripts->get_data($handle, 'after');
      if (!empty($after)) return $tag;
    }

    if (strpos($tag, ' defer') === false) {
      $tag = str_replace('<script ', '<script defer ', $tag);
    }
    return $tag;
  }
}

add_filter('script_loader_src', ['ScriptModifier', 'async_scripts'], 10, 2);
add_filter('script_loader_tag', ['ScriptModifier', 'defer_scripts'], 10, 3);
