<?php
/*
Template Name: Home Page Template
*/

get_header();
get_template_part('template-parts/content/home','header');
?>

<!-- Content -->
<section id="content" class="container">
	<?php get_template_part('template-parts/content/home','content'); ?>
	<?php get_template_part('template-parts/content/home','partners'); ?>
	<?php get_template_part('template-parts/content/home','form'); ?>
</section>

<?php
	get_footer();
?>