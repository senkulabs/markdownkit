<script>
    import { convertToTree } from '$lib';
    import { generateTree } from '$lib/generate-tree';

    let gitPromise = $state();
    let gitRepo = $state('');

    /**
     * @param {{ preventDefault: () => void; }} event
     */
    function submit(event) {
        event.preventDefault();
        if (gitRepo !== '') {
            gitPromise = fetch(`https://api.github.com/repos/${gitRepo}/git/trees/main?recursive=1`).then(response => response.json());   
        }
    }
</script>

<div class="container p-2 mx-auto">
    <form onsubmit={submit} style="margin-bottom: 1rem;">
        <input bind:value={gitRepo} type="text" style="width: 50%;" placeholder="Input GitHub repository e.g. sveltejs/svelte">
        <button>Submit</button>
    </form>
    {#if gitPromise}
        {#await gitPromise}
            <p>Get Git tree result...</p>
        {:then result}
            {@const gitTree = result.tree.map((/** @type {{ path: string; }} */ content, /** @type {number} */ index) => {
                const depth = content.path.split('/');
                const textIndex = depth.length;
                return {
                    id: index + 1,
                    depth: textIndex,
                    text: depth[textIndex - 1],
                    depthIndicator: '',
                }
            }) }
            <div class="git-tree">
                { generateTree(convertToTree(gitTree)) }
            </div>
        {:catch error}
            <p>{error.message}</p>
        {/await}
    {/if}
</div>

<style>
    .git-tree {
        width: 480px;
        max-height: 480px;
        white-space: pre;
        font-family: monospace;
        font-size: 0.875rem;
        line-height: 2;
        overflow: auto;
        background: lightgray;
        padding: 1rem;
        border-radius: .5rem;
        margin-bottom: 1rem;
    }
</style>