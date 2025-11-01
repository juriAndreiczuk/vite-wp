<?php
// To use the migrate_database function, run this in the Site Shell:
// wp eval 'migrate_database("site.local", "site.com");'

function migrate_database(string $local, string $remote): void {
  if (php_sapi_name() !== 'cli') { return; }

  $backup_dir = get_template_directory() . '/db_backup';

  if (!is_dir($backup_dir) && !mkdir($backup_dir, 0777, true) && !is_dir($backup_dir)) {
    return;
  }

  if (defined('ABSPATH')) {
    @chdir(ABSPATH);
  }

  $backup  = escapeshellarg($backup_dir . '/backup.sql');
  $changed = escapeshellarg($backup_dir . '/changed.sql');
  $oldUrl  = escapeshellarg("http://{$local}");
  $newUrl  = escapeshellarg("https://{$remote}");

  $commands = [
    "wp db export $backup",
    "wp search-replace $oldUrl $newUrl --all-tables",
    "wp db export $changed",
    "wp db import $backup",
  ];

  foreach ($commands as $cmd) {
    exec($cmd, $out, $code);
    if ($code !== 0) {
      return;
    }
    $out = [];
  }
}
