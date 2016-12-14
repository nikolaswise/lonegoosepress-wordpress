<?php
/**
 * Custom functions that act independently of the theme templates.
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package fuzzco
 */


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


// Tiny MCE Editor settings

function fuzzco_format_TinyMCE( $in ) {
  $in['remove_linebreaks'] = false;
  $in['gecko_spellcheck'] = false;
  $in['keep_styles'] = true;
  $in['accessibility_focus'] = true;
  $in['tabfocus_elements'] = 'major-publishing-actions';
  $in['media_strict'] = true;
  $in['paste_remove_styles'] = true;
  $in['paste_remove_spans'] = true;
  $in['paste_strip_class_attributes'] = 'none';
  $in['paste_text_use_dialog'] = true;
  $in['wpeditimage_disable_captions'] = true;
  $in['plugins'] = 'tabfocus,paste,media,fullscreen,wordpress,wpeditimage,wpgallery,wplink,wpdialogs,wpfullscreen';
  $in['content_css'] = get_template_directory_uri() . "/editor-style.css";
  $in['wpautop'] = true;
  $in['apply_source_formatting'] = false;
        $in['block_formats'] = "Paragraph=p; Heading 3=h3; Heading 4=h4";
  $in['toolbar1'] = 'bold,italic,alignleft,aligncenter,alignright,link,unlink,wp_fullscreen ';
  $in['toolbar2'] = 'formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help ';
  $in['toolbar3'] = '';
  $in['toolbar4'] = '';
  return $in;
}
// add_filter( 'tiny_mce_before_init', 'fuzzco_format_TinyMCE' );



/**
 * Removes the all but the formatting button from the post editor.
 *
 * @since    1.0.0
 *
 * @param    array    $buttons    The current array buttons including the kitchen sink.
 * @return   array                The updated array of buttons that exludes the kitchen sink.
 */
function fuzzco_remove_from_kitchen_sink( $buttons ) {
  $invalid_buttons = array(
      'underline',
      'blockquote',
      'strikethrough',
      'bullist',
      'numlist',
      'justifyfull',
      'forecolor',
      '|',
      'pastetext',
      'pasteword',
      'removeformat',
      'charmap',
      'outdent',
      'indent',
      'undo',
      'redo',
      'wp_help'
    );

  foreach ( $buttons as $button_key => $button_value ) {

        if ( in_array( $button_value, $invalid_buttons ) ) {
            unset( $buttons[ $button_key ] );
        }

  }
  return $buttons;
}

add_filter( 'mce_buttons_2', 'fuzzco_remove_from_kitchen_sink');



function fuzzco_toolbars( $toolbars ) {
  // Uncomment to view format of $toolbars
  // https://www.advancedcustomfields.com/resources/customize-the-wysiwyg-toolbars/
  /*
  echo '< pre >';
    print_r($toolbars);
  echo '< /pre >';
  die;
  */

  // Add a new toolbar called "Very Simple"
  // - this toolbar has only 1 row of buttons
  $toolbars['Very Simple' ] = array();
  $toolbars['Very Simple' ][1] = array('bold' , 'italic' , 'alignleft', 'aligncenter', 'alignright', 'link', 'unlink', 'wp_fullscreen' );

  // Edit the "Full" toolbar and remove 'code'
  // - delete from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
  if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false )
  {
      unset( $toolbars['Full' ][2][$key] );
  }

  // remove the 'Basic' toolbar completely
  unset( $toolbars['Basic' ] );

  // return $toolbars - IMPORTANT!
  return $toolbars;
}
add_filter( 'acf/fields/wysiwyg/toolbars' , 'fuzzco_toolbars'  );
