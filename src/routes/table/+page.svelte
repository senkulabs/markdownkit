<script>
	import Table from '$lib/components/Table.svelte';
</script>

<svelte:head>
	<title>Table - Markdown Tools</title>
	<meta name="title" content="Table - Markdown Tools">
	<meta name="description" content="Your daily basis tool when you write markdown. It covers markdown tree generator, markdown git tree generator, and markdown table generator">
	<meta name="og:type" content="website">
	<meta name="og:title" content="Table - Markdown Tools">
	<meta name="og:description" content="Your daily basis tool when you write markdown. It covers markdown tree generator, markdown git tree generator, and markdown table generator">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Table - Markdown Tools">
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

    <h2>Table</h2>

    <Table />
</div>