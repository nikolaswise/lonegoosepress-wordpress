<?php
  $context = Timber::get_context();

  $posts = array(
    'post_type' => 'post',
    'posts_per_page' => -1,
  );

  $context['posts'] = Timber::get_posts( $posts );
  Timber::render('pages/impressions.twig', $context);