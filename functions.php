<?php

require 'vendor/autoload.php';
use eftec\bladeone\BladeOne;

$views = __DIR__ . '/views';
$cache = __DIR__ . '/cache';

if (!is_dir($cache)) {
	mkdir($cache, 0755, true);
}

$blade = new BladeOne($views, $cache, BladeOne::MODE_AUTO);

if (!defined('VITE_ENVIRONMENT_TYPE')) {
	define('VITE_ENVIRONMENT_TYPE', 'production');
}

if(VITE_ENVIRONMENT_TYPE === 'dev' && defined( 'WP_DEBUG' ) && WP_DEBUG) {
  $whoops = new \Whoops\Run;
  $whoops->pushHandler( new \Whoops\Handler\PrettyPageHandler );
  $whoops->register();
}

require_once 'inc/core/load-blade-templates.php';
require_once 'inc/core/theme-setup.php';
require_once 'inc/core/script-modifier.php';
require_once 'inc/core/vite.config.php';
require_once 'inc/posts/load-posts.php';
require_once 'inc/posts/post-type-custom.php';
require_once 'inc/helpers/utils.php';

ViteConfig::init();
