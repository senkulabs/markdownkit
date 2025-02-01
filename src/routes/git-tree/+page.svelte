<script>
	import GitTree from '$lib/components/GitTree.svelte';
</script>

<div class="container p2 mx-auto">
    <h1><a href="/">markdowntools.org</a></h1>
    <p>Your daily basis tool when you write markdown.</p>
    
    <nav>
        <a href="/tree">Tree</a>
        <a href="/git-tree">Git Tree</a>
        <a href="/table">Table</a>
    </nav>
    
    <h2>Git Tree</h2>
    
    <GitTree />
</div>