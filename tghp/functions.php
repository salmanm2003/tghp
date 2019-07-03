<?php

/**
 * Enqueue scripts and styles.
 */

function tghp_scripts() {
    wp_enqueue_style( 'google_web_fonts', 'https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900|Poppins:100,200,300,400,600,700,800,900&display=swap' );
	wp_enqueue_style( 'style', get_stylesheet_uri(), array(), wp_get_theme()->get( 'Version' ) );
	wp_enqueue_style( 'tghp-style', get_template_directory_uri() . '/assets/dist/css/style.css',false,'1.1','all');

}

add_action( 'wp_enqueue_scripts', 'tghp_scripts' );