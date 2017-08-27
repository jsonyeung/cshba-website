<?php

$context = Timber::get_context();
$context['post'] = new TimberPost();

$args = array(
    'post_type' => 'society',
    'posts_per_page' => 6,
);
$context['societies'] = Timber::get_posts($args); 

$args = array(
    'post_type' => 'initiative',
    'posts_per_page' => 4,
);
$context['initiatives'] = Timber::get_posts($args); 

$templates = array('front-page.twig');
Timber::render($templates, $context);