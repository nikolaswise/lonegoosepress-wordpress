<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package fuzzco
 */

get_header(); ?>

	<section class="page-content">
		<div class="row">
			<div class="large-9 small-12 columns">
				<?php
				while ( have_posts() ) : the_post();

					get_template_part( 'template-parts/content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					if ( comments_open() || get_comments_number() ) :
						comments_template();
					endif;

				endwhile; // End of the loop.
				?>
			</div>
			<div class="large-3 small-12 columns">
				<?php get_sidebar(); ?>
			</div>
		</div> <!-- .row -->
	</section><!-- .page-content -->

<?php
get_sidebar();
get_footer();
