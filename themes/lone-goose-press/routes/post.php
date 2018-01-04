<?php
  $context = Timber::get_context();

  $getPost = array(
    'name' => $params['slug']
  );

  $context['post'] = Timber::get_posts( $getPost );

  Timber::render('pages/post.twig', $context);