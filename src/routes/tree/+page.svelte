<script>
	import Tree from '$lib/components/Tree.svelte';
</script>

<svelte:head>
	<title>Tree - Markdown Kit</title>
	<meta name="title" content="Tree - Markdown Kit">
	<meta name="description" content="Your daily tools for writing markdown. It has markdown tree generator, markdown git tree generator, and markdown table generator.">
	<meta name="og:type" content="website">
	<meta name="og:title" content="Tree - Markdown Kit">
	<meta name="og:description" content="Your daily tools for writing markdown. It has markdown tree generator, markdown git tree generator, and markdown table generator.">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Tree - Markdown Kit">
	<meta name="twitter:description" content="Your daily tools for writing markdown. It has markdown tree generator, markdown git tree generator, and markdown table generator.">
</svelte:head>

<div class="container p-2 mx-auto">
    <h1><a href="/">markdownkit.org</a></h1>
    <p>Your daily tools for writing markdown.</p>
    
    <nav>
        <a href="/tree">Tree</a>
        <a href="/git-tree">Git Tree</a>
        <a href="/table">Table</a>
    </nav>
    
    <h2>Tree</h2>
    
    <Tree />
</div>