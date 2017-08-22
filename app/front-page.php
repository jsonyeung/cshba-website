<?php

$context = Timber::get_context();
$context['post'] = new TimberPost();

$templates = array('front-page.twig');
Timber::render($templates, $context);