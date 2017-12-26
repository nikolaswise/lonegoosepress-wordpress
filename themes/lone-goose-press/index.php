<?php
  $context = Timber::get_context();
  $context['message'] = 'Here are some twig templates rendered with Timber so you never have to deal with The Loop ever again.';
  $context['hey'] = 'Dear Developer,';
  Timber::render('pages/index.twig', $context);