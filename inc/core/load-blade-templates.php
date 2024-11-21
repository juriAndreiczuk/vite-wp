<?php

add_filter('template_include', 'load_blade_template');

function load_blade_template($template) {
  global $blade;
  $page_template = basename($template, '.blade.php');

  $blade_template = basename($page_template, '.blade.php');
  if (file_exists(get_template_directory() . '/views/'.$blade_template.'.blade.php')) {
    echo $blade->run($blade_template);
    exit;
  }

  return $template;
}
