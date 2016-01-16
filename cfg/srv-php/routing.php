<?php

$root = $_SERVER['DOCUMENT_ROOT'];
$req = $_SERVER['REQUEST_URI'];
$path = '/'.ltrim(parse_url($req)['path'],'/');
$fullpath = $root.$path;

$matches = array();

// WP-Content rule
if(preg_match('/wp/wp-content/\.*', $req, $matches) === 1) {
	readfile($matches[1]);
	return true;
}
	
// Wordpress rule
  else if(file_exists($fullpath) && stripos($req, '.php')) {
	include $fullpath;
} else if(file_exists($req)) {
	return false;
} else if(is_dir($req)) {
	return false;
} else {
	include('index.php');
}