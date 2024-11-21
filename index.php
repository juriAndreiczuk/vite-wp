
<?php

$page_templates = [
  'is_404' => '404',
  'is_single' => 'single',
  'is_archive' => 'archive'
];

foreach ($page_templates as $condition => $template) {
  if (function_exists($condition) && $condition()) {
    echo $blade->run($template);
    exit;
  }
}
