<?php

if ( !class_exists( 'Timber' ) ) {

	add_action( 'admin_notices', function() {
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php') ) . '</a></p></div>';
	});
	
	add_filter('template_include', function($template) {
		return get_stylesheet_directory() . '/static/no-timber.html';
	});
	
	return;
}

Timber::$dirname = array('templates', 'views');

class CSHBASite extends TimberSite {

	function __construct() {
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_theme_support( 'html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption' ) );

		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		//add_filter('acf/settings/show_admin', '__return_false');
		
		add_action( 'init', array( $this, 'options_page' ) );
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );

		parent::__construct();
	}
	
	function options_page() {
		if ( function_exists('acf_add_options_page') ) {

			acf_add_options_page(array(
				'page_title' => 'Theme Settings',
				'menu_title' => 'Theme Settings',
				'menu_slug' => 'theme-settings',
				'redirect' => false
			));

			acf_add_options_sub_page(array(
				'page_title' => 'Social Media Settings',
				'menu_title' => 'Social Media',
				'parent_slug' => 'theme-settings'
			));

		}
	}
	
	function register_post_types() {
		//this is where you can register custom post types
    }
    
	function register_taxonomies() {
		//this is where you can register custom taxonomies
    }
    
	function add_to_context( $context ) {
		$context['site'] = $this;
		$context['menu'] = new TimberMenu();
		$context['options'] = get_fields('option');

		return $context;
    }
}

new CSHBASite();