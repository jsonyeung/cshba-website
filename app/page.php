<?php

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render(array( 
    'page-' . $post->post_name . '.twig', 
    'page.twig' 
), $context);