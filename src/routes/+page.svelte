<script>
	import GitTree from '$lib/components/GitTree.svelte';
    import Table from '$lib/components/Table.svelte';
	import Tree from '$lib/components/Tree.svelte';
</script>

<svelte:head>
	<title>Markdown Kit</title>
	<meta name="title" content="Markdown Kit">
	<meta name="description" content="Your daily tools for writing markdown. It has markdown tree generator, markdown git tree generator, and markdown table generator.">
	<meta name="og:type" content="website">
	<meta name="og:title" content="Markdown Kit">
	<meta name="og:description" content="Your daily tools for writing markdown. It has markdown tree generator, markdown git tree generator, and markdown table generator.">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:title" content="Markdown Kit">
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

    <h2>Quick Access</h2>
    <nav>
        <a href="#tree">Tree</a>
        <a href="#git-tree">Git Tree</a>
        <a href="#table">Table</a>
    </nav>

    <div class="section">
        <section id="tree">
            <h2><a href="#tree">Tree</a></h2>
            <Tree />
        </section>
    
        <section id="git-tree">
            <h2><a href="#git-tree">Git Tree</a></h2>
            <GitTree/>
        </section>
    
        <section id="table">
            <h2><a href="#table">Table</a></h2>
            <Table/>
        </section>
    </div>
</div>

<style>
    section {
        min-height: 50%;
    }
</style>