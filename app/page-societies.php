<?php

$context = Timber::get_context();
$context['post'] = new TimberPost();

Timber::render(array('page-societies.twig'), $context);