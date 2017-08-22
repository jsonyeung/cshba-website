<?php

$context = Timber::get_context();

$context['posts'] = Timber::get_posts();
$context['foo'] = 'bar';

$templates = array('front-page.twig');

Timber::render($templates, $context);