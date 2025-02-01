<script>
	import Tree from '$lib/components/Tree.svelte';
</script>

<svelte:head>
	<title>Tree - Markdown Tools</title>
	<meta name="title" content="Tree - Markdown Tools">
	<meta name="description" content="Your daily basis tool when you write markdown. It covers markdown tree generator, markdown git tree generator, and markdown table generator">
	<meta name="og:type" content="website">
	<meta name="og:title" content="Tree - Markdown Tools">
	<meta name="og:description" content="Your daily basis tool when you write markdown. It covers markdown tree generator, markdown git tree generator, and markdown table generator">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Tree - Markdown Tools">
	<meta name="twitter:description" content="Your daily basis tool when you write markdown. It covers markdown tree generator, markdown git tree generator, and markdown table generator">
</svelte:head>

<div class="container p-2 mx-auto">
    <h1><a href="/">markdowntools.org</a></h1>
    <p>Your daily basis tool when you write markdown.</p>
    
    <nav>
        <a href="/tree">Tree</a>
        <a href="/git-tree">Git Tree</a>
        <a href="/table">Table</a>
    </nav>
    
    <h2>Tree</h2>
    
    <Tree />
</div>