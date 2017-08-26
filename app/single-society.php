<?php
/*
Template Name: Society Page
Template Post Type: society
*/

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render(array('society.twig'), $context);