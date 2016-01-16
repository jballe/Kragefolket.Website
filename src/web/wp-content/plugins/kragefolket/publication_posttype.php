<?php

require_once 'always.inc.php';

add_action('init', 'kragefolket_gruppeblad_posttype');
function kragefolket_gruppeblad_posttype() {
  $labels = array(
    'name'                => 'Kragekaldet',//__('Publications', 'kragefolket'),
    'singularname'        => 'Kragekald',//__('Publication', 'kragefolket'),
    'add_new'             => __('Add new', 'kragefolket'),
    'add_new_item'        => __('Add new publication', 'kragefolket'),
    'edit_item'           => __('Edit publication', 'kragefolket'),
    'new_item'            => __('New publication', 'kragefolket'),
    'view_item'           => __('View publication', 'kragefolket'),
    'not_found'           => __('No publication found', 'kragefolket'),
    'not_found_in_trash'  => __('No publications found in trash', 'kragefolket')
  );

  $args = array(
    'labels'              => $labels,
    'description'         => __('Publications published', 'kragefolket'),
    'query_var'           => __('publication_var', 'kragefolket'),
    'public'              => true,
    'show_ui'             => true,
    'show_in_nav_menus'   => true,
    'menu_position'       => 33,
    'menu_icon'           => 'dashicons-book',
    'supports'            => array('title', 'thumbnail', 'excerpt', 'page-attributes', 'custom-fields'),
    'has_archive'         => true,
    'rewrite'             => array('slug' => 'kragekaldet')
  );

  register_post_type('publication', $args);
  flush_rewrite_rules( false );

  add_filter('manage_edit-publication_columns', 'krage_gruppeblad_edit_columns');
  function krage_gruppeblad_edit_columns($columns) {

    unset($columns['wpseo-score']);
    unset($columns['wpseo-title']);
    unset($columns['wpseo-metadesc']);
    unset($columns['wpseo-focuskw']);
    $columns['krage-issuuid'] = 'Issuu Id';
    $columns['krage-mediaobject'] = 'PDF';

    return $columns;
  }

  add_action('manage_publication_posts_custom_column', 'krage_publication_custom_columns', 10, 2);
  function krage_publication_custom_columns($column, $post_id) {
    switch($column) {
      case 'krage-issuuid':
        $issuuid = get_post_meta($post_id, 'wpcf-issuu-id', true);
        if(strlen($issuuid)>=0) {
          echo $issuuid;
        } else echo '-';
        break;

      case 'krage-mediaobject':
        $mediaid = get_post_meta($post_id, 'wpcf-media-object-id', true);
        //if(strlen($mediaid)>0) {
          echo '<a href="http://kragefolketfiler.balle-net.dk/gs/handler/getmedia.ashx?moid='.$mediaid.'&dt=3&sa=1">'
                .$mediaid.'</a>';
        //} else echo '-';
        break;

      default:
        break;
    }
  }
}

?>
