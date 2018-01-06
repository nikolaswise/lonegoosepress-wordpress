<?php
  $context = Timber::get_context();
  $category = $params['category'];

  $posts = array(
    'post_type' => $category,
    'posts_per_page' => -1,
  );

  $context['posts'] = Timber::get_posts( $posts );
  $context['category'] = $category;

  Timber::render('pages/section.twig', $context);