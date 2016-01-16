<?php
/*
* Plugin Name: Kragefolket
* Plugin URI: http://www.kragefolket.dk
* Description: Functionality for the Kragefolket website
* Version: 1.0.0
* Author: Jesper Balle
* Author URI: http://balle.rocks
* Text Domain: kragefolket
* Domain Path: /languages/
* Network: true
* License: LGPL
*/

define( 'KRAGEFOLKETPLUGIN_PATH', str_replace('/', '\\', plugin_dir_path( __FILE__ ) ));

add_action('init', 'krageplugin_init');

function krageplugin_init() {
  load_plugin_textdomain('kragefolket', false, KRAGEFOLKETPLUGIN_PATH . '/languages' );
}

add_action('wp_dashboard_setup', 'krageplugin_linkwidget');

require_once KRAGEFOLKETPLUGIN_PATH.'always.inc.php';
require_once KRAGEFOLKETPLUGIN_PATH.'widget.php';
require_once KRAGEFOLKETPLUGIN_PATH.'publication_posttype.php';
