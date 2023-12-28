<?php

if (!defined('VITE_ENVIRONMENT_TYPE')) {
	define('VITE_ENVIRONMENT_TYPE', 'production');
}


require_once 'inc/core/theme-setup.php';
require_once 'inc/core/script-modifier.php';
require_once 'inc/core/vite.config.php';
require_once 'inc/posts/load-posts.php';
require_once 'inc/posts/post-type-cusom.php';
require_once 'inc/helpers/utils.php';

ViteConfig::init();