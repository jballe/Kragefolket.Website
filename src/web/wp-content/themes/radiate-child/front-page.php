<?php
/**
 * The template file to show the front page display.
 *
 * @package ThemeGrill
 * @subpackage Radiate
 * @since Radiate 1.0
 */

get_header(); ?>

  <?php
  $page_array = array( get_theme_mod( 'page-setting-one' ), get_theme_mod( 'page-setting-two' ), get_theme_mod( 'page-setting-three' ) );
  $get_featured_pages = new WP_Query( array(
        'posts_per_page' 			=> 3,
        'post_type'					=> array( 'page' ),
        'post__in'		 			=> $page_array,
        'orderby' 		 			=> 'post__in',
        'ignore_sticky_posts' 	=> 1
      ));
  ?>
  <div id="featured_pages" class="clearfix">
    <?php
    $j = 1;
    while ( $get_featured_pages->have_posts() ) :
      $get_featured_pages->the_post();
      if( $j % 2 == 1 && $j > 1 ) { $page_class = "tg-one-third tg-one-third-last"; }
      else { $page_class = "tg-one-third"; }
      ?>
      <div class="<?php echo $page_class; ?>">
        <div class="page_text_container">
          <?php if ( has_post_thumbnail() ) {
            echo '<a title="';
            the_title_attribute();
            echo '" href="'.get_the_permalink().'">';
            the_post_thumbnail();
            echo '</a>';
          } ?>
          <h1 class="entry-title"><a title="<?php the_title_attribute(); ?>" href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
          <?php the_excerpt(); ?><a class="more-link" title="<?php the_title_attribute(); ?>" href="<?php the_permalink(); ?>"><?php _e( 'Read more','radiate' ); ?></a>
        </div>
      </div>
      <?php $j++;
    endwhile;
    wp_reset_postdata();
    ?>
  </div>

  <div id="featured_pages" class="clearfix">
    <?php the_content(); ?>
  </div>

    </main><!-- #main -->
  </div><!-- #primary -->

<?php get_footer(); ?>
