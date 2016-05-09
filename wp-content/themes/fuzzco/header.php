<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package fuzzco
 */
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="http://gmpg.org/xfn/11">
  <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
  <!--
    Twitter card tags with combination of the open graph tags below
    https://dev.twitter.com/cards/getting-started
  -->
  <meta name="twitter:card" content="<?php echo get_bloginfo('description', 'display') ?>">
  <meta name="twitter:site" content=""> <?php // Add @username ?>

  <!--
    Social tags taken from Facebook guidelines:
    https://developers.facebook.com/docs/sharing/best-practices
  -->
  <?php if (is_front_page()) : ?>
  <meta property="og:title" content="<?php bloginfo('title'); ?>" />
  <?php else : ?>
  <meta property="og:title" content="<?php echo get_the_title(); ?> | <?php bloginfo('title'); ?>">
  <?php endif; ?>
  <meta property="og:site_name" content="<?php bloginfo('name'); ?>" />
  <meta property="og:description" content="<?php echo get_bloginfo('description', 'display') ?>">
  <meta property="og:url" content="<?php echo get_permalink($post->ID) ?>" />
  <!-- Recommended logo size is 1200 x 630px -->
  <meta property="og:image" content="<?php echo get_template_directory_uri(); ?>/-/img/logo.png">

  <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/-/img/favicon.ico">

  <!-- Typekit -->
  <script>
    (function(d) {
      var config = {
        kitId: 'kxw4hri',
        scriptTimeout: 3000,
        async: true
  		},
      h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
  	})(document);
  </script>

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?> id="page-<?php echo is_front_page() ? 'home' : get_query_var('name');?>">
<div id="page" class="site">

	<header class="site-header" role="banner">
		  <div class="row">
        <div class="xlarge-4 columns">
          <p>
            <a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home" class="logo"><?php bloginfo( 'name' ); ?></a>
          </p>
        </div>
        <div class="xlarge-8 columns">
          <nav id="site-navigation" class="main-navigation" role="navigation">
            <?php
              $args = array(
                'container' => 'ul',
                'menu_class' => 'menu',
                'menu_id' => ''
              );

              wp_nav_menu( $args );
            ?>
          </nav><!-- #site-navigation -->
        </div>
		</div>
	</header>

	<div id="content" class="site-content">
