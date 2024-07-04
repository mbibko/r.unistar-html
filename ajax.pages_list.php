<?php

error_reporting(-1);
ini_set('display_errors', false);

$result = array();
$files = scandir('.');
foreach ($files as $file) {
  if (is_dir($file) || !preg_match('!^.+\.html?$!u', $file) || preg_match('/^data-/', $file)) {
    continue;
  }
  $result[] = $file;
}
header('Content-type: application/json');
echo json_encode(array('pages' => $result));