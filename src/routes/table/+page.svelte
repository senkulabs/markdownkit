<script>
	import Table from '$lib/components/Table.svelte';
</script>

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