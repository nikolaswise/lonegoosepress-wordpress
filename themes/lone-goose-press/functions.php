<?php
/**
 * lgp functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package lgp
 */

if ( ! function_exists( 'lgp_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function lgp_setup() {

	// Add default posts and comments RSS feed links to head.
	// add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary', 'lonegoosepress' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );
}
endif;
add_action( 'after_setup_theme', 'lgp_setup' );

/**
 * Deregister wordpress default scripts that
 * lgp doesn't use
 */
function lgp_deregister_scripts(){
  // Embed script helper for videos
  wp_deregister_script( 'wp-embed' );
  // Wordpress jQuery
  wp_deregister_script('jquery');
  // Wordpress style.css
  wp_deregister_style('style');
}
add_action( 'wp_footer', 'lgp_deregister_scripts' );

/**
 * Enqueue scripts and styles.
 */
function lgp_scripts() {
  wp_enqueue_style('lgp_main', get_template_directory_uri() . '/style.min.css', false, filemtime(get_stylesheet_directory() . '/style.min.css'));

  wp_register_script('lgp_scripts', get_template_directory_uri() . '/js/bundle.js', array(), filemtime(get_stylesheet_directory() . '/js/bundle.js'), true);
  wp_enqueue_script('lgp_scripts');

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'lgp_scripts' );


/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';


/**
 * Hide Admin bar when logged in
 */
show_admin_bar( false );
