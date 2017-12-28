<?php
  $context = Timber::get_context();
  $context['homepage'] = true;
  Timber::render('pages/index.twig', $context);