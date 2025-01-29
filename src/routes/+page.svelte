<script>
	import Tree from '$lib/components/Tree.svelte';
</script>

<h1><a href="/">markdowntools.org</a></h1>
<p>Your daily basis tool when you write markdown.</p>

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

<section id="tree">
    <h2>Tree</h2>
    <div style="height: 480px;">
        <Tree />
    </div>
</section>

<section id="git-tree">
    <h2>Git Tree</h2>
    <div style="height: 480px">
        <p>This is a Git tree section.</p>
    </div>
</section>

<section id="table">
    <h2>Table</h2>
    <div style="height: 480px;">
        <p>This is a table section.</p>
    </div>
</section>
