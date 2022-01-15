<!-- No TypeScript support yet: https://github.com/pngwn/MDsveX/issues/116 -->
<script context="module">
	import Head from '$lib/common/head/Head.svelte';
	import { parsePost } from '$lib/markdown/markdownParser';
	import img from '$lib/markdown/post/PostImage.svelte';
	import a from '$lib/markdown/post/PostLink.svelte';
	import dateformat from 'dateformat';
	export { img, a };
</script>

<script>
	export const post = parsePost({ data: $$props, path: '' });
</script>

<Head title={`${post.title} | Narudom`} description={post.description} />

<section class="container mx-auto px-4 pt-4 pb-16 prose lg:prose-md dark:prose-invert">
	<a class="block mt-4 text-neutral-500" href="/posts">← Posts</a>
	<h1 class="pt-8 m-0">{post.title}</h1>
	<span class="block pt-8 text-md text-neutral-500">
		{dateformat(new Date(post.publishedTime), 'dd mmm yyyy')} · {post.keywords || ''}</span
	>
	<div class="pt-4">
		<slot />
	</div>
</section>
