<?php

if ( ! function_exists( 'custom_posted_on' ) ) :
/**
 * Prints HTML with meta information for the current post-date/time and author.
 */
function custom_posted_on() {
  $time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time>';
  if ( get_the_time( 'U' ) !== get_the_modified_time( 'U' ) ) {
    $time_string .= '<time class="updated" datetime="%3$s">%4$s</time>';
  }

  $time_string = sprintf( $time_string,
    esc_attr( get_the_date( 'c' ) ),
    esc_html( get_the_date() ),
    esc_attr( get_the_modified_date( 'c' ) ),
    esc_html( get_the_modified_date() )
  );

  printf( '<span class="posted-on">%1$s</span>'
  //.'<span class="byline">%2$s</span>'
  ,
    sprintf( '<a href="%1$s" rel="bookmark">%2$s</a>',
      esc_url( get_permalink() ),
      $time_string
    )
//    sprintf( '<span class="author vcard"><a class="url fn n" href="%1$s">%2$s</a></span>',
//      esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ),
//      esc_html( get_the_author() )
//    )
  );
}
endif;


?>
