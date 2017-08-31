<?php
/*
Template Name: Initiative Page
Template Post Type: initiative
*/

$context = Timber::get_context();
$context['post'] = new TimberPost();

$args = array(
    'post_type' => 'initiative',
    'post_status' => 'publish',
    'posts_per_page' => 3,
    'post__not_in' => array( $context['post']->ID ),
    'orderby' => 'rand',
);
$context['initiatives'] = Timber::get_posts($args);  

Timber::render(array('initiative.twig'), $context);