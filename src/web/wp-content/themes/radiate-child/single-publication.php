<?php
/**
* This is for gruppeblad pages.
*/

get_header(); ?>

<div id="primary" class="content-area">
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

      <?php
      $issuuid = get_post_meta(get_the_ID(), 'wpcf-issuu-id', true);
      $media = intval(get_post_meta(get_the_ID(), 'wpcf-media-object-id', true));
      $mediaid = is_numeric($media) ? intval($media) : 0;

      if($mediaid>0) {
        echo '<a href="http://kragefolketfiler.balle-net.dk/gs/handler/getmedia.ashx?moid='.$mediaid.'&dt=2&sa=1" onclick="window.open(this.href);trackDownload();return false;">'
          . sprintf(__('Download %s', 'kragefolket'), get_the_title())
          .'</a><br />';
      }

      if(strlen($issuuid)>0) {
        echo '<div style="width: 100%; height:0; padding-top: 90%; position: relative;"><div data-configid="'.$issuuid.'" class="issuuembed" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></div><script type="text/javascript" src="//e.issuu.com/embed.js" async="true"></script></div>';
        echo '<script type="text/javascript" charset="utf-8">
        var viewer;
    window.onIssuuReadersLoaded = function() {
        viewer = window.IssuuReaders.get("'.$issuuid.'");
        viewer.addEventListener("change", "issuuTrackChangedPage");
    };
    window.issuuTrackChangedPage = function() {
      var gaFunc = window.__gaTracker;
      if(!gaFunc) {
        return;
      }

      var page = viewer.getPageNumber();
      gaFunc("send", "event", "publication", "changepage", "'.get_the_title().'", page);
    }
    window.trackDownload = function() {
      var gaFunc = window.__gaTracker;
      if(!gaFunc) {
        return;
      }

      gaFunc("send", "event", "publication", "download", "'.get_the_title().'");
    }
</script>';
      }
      ?>

</div></article>


<?php endwhile; // end of the loop. ?>

</main><!-- #main -->
</div><!-- #primary -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>
