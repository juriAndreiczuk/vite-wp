<?php

class ScriptModifier {
  public static function async_scripts($url) {
    if (strpos($url, '#asyncload') !== false) {
      if (is_admin()) {
        return str_replace('#asyncload', '', $url);
      } else {
        return str_replace('#asyncload', '', $url) . "' defer='defer";
      }
    }
    return $url;
  }

  public static function defer_scripts($url) {
    if (is_user_logged_in() || false === strpos($url, '.js')) {
      return $url;
    }
    return str_replace(' src', ' defer="defer" src', $url);
  }
}

add_filter('clean_url', array('ScriptModifier', 'async_scripts'), 11, 1);
add_filter('script_loader_tag', array('ScriptModifier', 'defer_scripts'), 10);
