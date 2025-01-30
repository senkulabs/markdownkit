import { generateTree } from './src/lib/generate-tree.js';

fetch('https://api.github.com/repos/sveltejs/svelte/git/trees/main?recursive=1').then(response => response.json()).then(data => {
    const result = data.tree.map((content, index) => {
        const depth = content.path.split('/');
        const textIndex = depth.length;
        return {
            id: index + 1,
            depth: textIndex,
            text: depth[textIndex - 1],
            depthIndicator: '',
        }
    });

    const treeStructure = convertToTree(result);
    console.log(treeStructure);
    console.log(generateTree(treeStructure));
});

function convertToTree(items) {
    // Create a root node
    const root = {
        name: '.',
        children: [],
        indentCount: -1,
        parent: null
    };

    let stack = [root];

    items.forEach(item => {
        const node = {
            name: item.text,
            children: [],
            indentCount: item.depth - 1, // Convert depth into indentCount
            parent: null
        }

        // Find the right parent
        while (stack.length > 1 && stack[stack.length - 1].indentCount >= node.indentCount) {
            stack.pop();
        }

        // Set the parent-child relationship
        const parent = stack[stack.length - 1];
        parent.children.push(node);
        node.parent = parent;

        // Add to stack if it could be a parent
        stack.push(node);
    });

    return root;
}