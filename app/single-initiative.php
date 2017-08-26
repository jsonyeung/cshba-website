<?php
/*
Template Name: Initiative Page
Template Post Type: initiative
*/

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render(array('initiative.twig'), $context);