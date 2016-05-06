<?php
/**
 * The template for displaying all single posts.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package fuzzco
 */

get_header(); ?>

<section class="page-content">
	<div class="row">
		<div class="large-9 small-12 columns">
			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/content', get_post_format() );

				the_post_navigation();

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
	</div><!-- .row -->
</section><!-- .page-content -->

<?php
get_footer();
