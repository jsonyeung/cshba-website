<?php

$context = Timber::get_context();

$context['posts'] = Timber::get_posts();
$context['foo'] = 'bar';

$templates = array('index.twig', 'page.twig');

if ( is_front_page() ) {
	array_unshift($templates, 'front-page.twig');
} 

elseif ( is_home() ) {
    array_unshift($templates, 'home.twig');
}

Timber::render($templates, $context);