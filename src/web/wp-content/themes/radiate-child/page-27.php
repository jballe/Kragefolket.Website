<?php
/**
* This is for the "blivspejder" page.
*
* This is a copy of the page.php but with added loop of enheder
*/

get_header(); ?>

<div id="primary" class="content-area full-width">
  <main id="main" class="site-main" role="main">

    <?php while ( have_posts() ) : the_post();
      // The following has been retreived from the template
    ?>

      <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <header class="entry-header">
          <h1 class="entry-title"><?php the_title(); ?></h1>
        </header><!-- .entry-header -->

        <div class="entry-content">
          <?php the_content(); ?>
        </div>

      <?php /*
        // This is my addition
        echo '<div class="enheder-liste">';

        $args = array(
                'post_type'       => 'enhed',
                'posts_per_page'  => 100,
                'post_status'     => 'publish',
                'orderby'         => 'menu_order title',
                'order'           => 'ASC'
                );
        $enhed = new WP_Query($args);
        while($enhed->have_posts()) : $enhed->the_post(); ?>

          <span class="image left"></span>
          <h2> <?php echo get_post_meta(get_the_ID(), 'wpcf-aldersgruppe', true) ?> - <?php the_title() ?></h2>
          <?php if(strlen(get_the_post_thumbnail())>0) { ?>
          <div class="img" style="float: right"><?php the_post_thumbnail() ?></div>
          <?php } ?>
          <div class="enhed description"> <?php the_content() ?></div>
          <?php
          $flokke = new WP_Query(array(
              'post_type'       => 'enhed-flok',
              'meta_query'      => array(
                array('key' => '_wpcf_belongs_enhed_id', 'value' => get_the_ID())
              ),
              'orderby'         => 'menu_order title',
              'order'           => 'ASC'

            ));
            $render_flok_title = $flokke->post_count > 1;
            if($render_flok_title) {
              echo '<p>Vi har ' . $flokke->post_count . ' flokke:</p>';
            }
            while($flokke->have_posts()) : $flokke->the_post();
              if($render_flok_title) { ?>
                <h5><?php the_title() ?></h5>
              <?php } ?>
              <p>Tidspunkt: <?php echo get_post_meta(get_the_ID(), 'wpcf-meetingtime', true) ?>
                <br />
                Kontakt: <?php echo get_post_meta(get_the_ID(), 'wpcf-leader', true) ?>,
                <?php $tlf = get_post_meta(get_the_ID(), 'wpcf-leader-phone', true);
                      if(strlen($tlf)>0) { echo "tlf. ".$tlf; }  ?>
                <?php $email = get_post_meta(get_the_ID(), 'wpcf-leader-email', true);
                      if(strlen($email)>0) { echo 'e-mail: <a href="mailto:'.$email.'">'.$email.'</a>'; }
                ?>
              </p>

          <?php
          endwhile;
          wp_reset_postdata();

        endwhile;
        wp_reset_postdata();

        echo '</div>';
         */?>

      </article>


    <?php endwhile; // end of the loop. ?>

  </main><!-- #main -->
</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
