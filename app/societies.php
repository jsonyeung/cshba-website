<?php

$context = Timber::get_context();
$context['post'] = new TimberPost();

$args = array(
    'post_type' => 'society',
    'posts_per_page' => 6,
);
$context['societies'] = Timber::get_posts($args); 

Timber::render(array('page-societies.twig'), $context);