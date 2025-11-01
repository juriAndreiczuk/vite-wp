<?php


class ThemeSetup {
	public static function after_setup () {
		add_theme_support('automatic-feed-links');
		add_theme_support('title-tag');
		add_theme_support('post-thumbnails');
		register_nav_menus(['menu-1' => esc_html__('Primary', 'fv')]);
		add_image_size( 'full-hd', 1920);
		show_admin_bar(false);
		if (function_exists('acf_add_options_page')) {
			acf_add_options_page();
		}
	}

	public static function mimes ($mimes) {
		$mimes['svg'] = 'image/svg+xml';
		return $mimes;
	}
}

add_action('after_setup_theme', array('ThemeSetup', 'after_setup'));
add_filter('upload_mimes', array('ThemeSetup', 'mimes'));

add_action('wp_enqueue_scripts', function () {
  wp_dequeue_style('wp-block-library');
  wp_dequeue_style('wp-block-library-theme');
  wp_dequeue_style('global-styles');
  wp_dequeue_style('classic-theme-styles');
}, 100);

add_action('wp_enqueue_scripts', function () {
  wp_dequeue_script('wp-i18n');
  wp_deregister_script('wp-i18n');

  wp_dequeue_script('wp-hooks');
  wp_deregister_script('wp-hooks');

  wp_dequeue_script('wp-polyfill');
  wp_deregister_script('wp-polyfill');
}, 100);