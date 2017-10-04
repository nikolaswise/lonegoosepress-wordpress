<?php
  $context = Timber::get_context();
  $context['message'] = 'I yam a massage from PHP';
  $context['hey'] = 'yo';
  Timber::render('index.twig', $context);