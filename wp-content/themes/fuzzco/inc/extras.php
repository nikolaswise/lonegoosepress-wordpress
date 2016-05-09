<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package fuzzco
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function fuzzco_body_classes( $classes ) {
	// Adds a class of group-blog to blogs with more than 1 published author.
	if ( is_multi_author() ) {
		$classes[] = 'group-blog';
	}

	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	return $classes;
}
add_filter( 'body_class', 'fuzzco_body_classes' );


/**
  * Remove Emojicons from wordpress core
  * http://wordpress.stackexchange.com/a/185578
 */
function disable_wp_emojicons() {

  // all actions related to emojis
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

  // filter to remove TinyMCE emojis
  add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );

/**
  * Disable emojicon from the tinymce editor
 */
function disable_emojicons_tinymce( $plugins ) {
  if ( is_array( $plugins ) ) {
    return array_diff( $plugins, array( 'wpemoji' ) );
  } else {
    return array();
  }
}

/**
 * Add correct GA ID based on if the site is live or development
 */

$host = $_SERVER['HTTP_HOST'];
if (strpos($host,'.dev') !== false) {
  // Add Fuzzcode Testing GA?
  define('GOOGLE_ANALYTICS_ID', 'UA-xxxxxx-1');
} else {
  // Client code
  define('GOOGLE_ANALYTICS_ID', 'UA-xxxxxx-1');
}


function google_analytics() { ?>
  <!-- Google Analytics -->
  <script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', '<?php echo GOOGLE_ANALYTICS_ID; ?>', 'auto');
  ga('send', 'pageview');

  </script>
  <!-- End Google Analytics -->
<?php }

if (GOOGLE_ANALYTICS_ID && !current_user_can('manage_options')) {
  add_action('wp_footer', 'google_analytics', 20);
}
