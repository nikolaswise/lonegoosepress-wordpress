<?php
/**
 *
 *
 * Routing!
 *
 * @package lgp
 */

Routes::map('/', function($params){
  Routes::load('routes/index.php');
});

Routes::map('impressions', function($params){
  Routes::load('routes/impressions.php');
});
Routes::map('impressions/:slug', function($params){
  Routes::load('routes/post.php', $params);
});

Routes::map('about', function($params){
  Routes::load('routes/about.php');
});

Routes::map('contact', function($params){
  Routes::load('routes/contact.php');
});

Routes::map('checkout', function($params){
  Routes::load('routes/checkout.php');
});
Routes::map('checkout/confirm', function($params){
  Routes::load('routes/confirm.php');
});
Routes::map('checkout/thanks', function($params){
  Routes::load('routes/confirm.php');
});
Routes::map('checkout/problem', function($params){
  Routes::load('routes/problem.php');
});

Routes::map('publications', function($params){
  Routes::load('routes/section.php');
});
Routes::map('publications/:category', function($params){
  Routes::load('routes/section.php');
});


Routes::map('commisions/', function($params){
  Routes::load('routes/section.php');
});
Routes::map('commisions/:category', function($params){
  Routes::load('routes/section.php');
});

Routes::map('404', function($params){
  Routes::load('routes/404.php');
});

Routes::map(':project', function($params){
  Routes::load('routes/project.php');
});
