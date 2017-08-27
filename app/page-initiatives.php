<?php

$context = Timber::get_context();
$context['post'] = new TimberPost();

$args = array(
    'post_type' => 'initiative',
    'posts_per_page' => -1,
);
$context['initiatives'] = Timber::get_posts($args); 

Timber::render(array('page-initiatives.twig'), $context);