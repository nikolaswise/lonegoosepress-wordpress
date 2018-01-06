<?php
  $context = Timber::get_context();

  $getPost = array(
    'post_type'      => $params['category'],
    'posts_per_page' => 1,
    'post_name__in'  => [$params['slug']]
  );

  $context['post'] = Timber::get_posts( $getPost );
  $context['slug'] = $params['slug'];
  $context['categ'] = $params['categ'];

  Timber::render('pages/single.twig', $context);