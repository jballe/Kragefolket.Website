<?php

register_sidebar( array(
  'name'          => __( 'Footer Widget Area', 'twentyfourteen' ),
  'id'            => 'sidebar-3',
  'description'   => __( 'Appears in the footer section of the site.', 'twentyfourteen' ),
  'before_widget' => '<aside id="%1$s" class="widget %2$s">',
  'after_widget'  => '</aside>',
  'before_title'  => '<h1 class="widget-title">',
  'after_title'   => '</h1>',
  ) );

 /*
  * @param array $classes A list of existing body class values.
  * @return array The filtered body class list.
  */
  function custom_body_classes( $classes ) {
    if ( is_active_sidebar( 'sidebar-3' ) ) {
      $classes[] = 'footer-widgets';
    }

    return $classes;
  }
  add_filter( 'body_class', 'custom_body_classes' );


?>
