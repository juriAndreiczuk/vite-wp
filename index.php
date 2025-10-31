
<?php

$page_templates = [
    "is_404" => "404",
    "is_archive" => "archive"
];

foreach ($page_templates as $condition => $template) {
    if (function_exists($condition) && $condition()) {
        echo $blade->run($template);
        exit;
    }
}

if (is_single()) {
    $object = get_queried_object();
    $post_type = $object instanceof WP_Post ? $object->post_type : null;

    $file_name = $post_type === "post" ? "single" : "single-{$post_type}";

    echo $blade->run($file_name);
    exit;
}
