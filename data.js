// fetch('https://api.github.com/repos/woochanleee/project-tree-generator/git/trees/main?recursive=1').then(response => response.json()).then(data => {
//     const result = data.tree.map((content, index) => {
//         const depth = content.path.split('/');
//         const textIndex = depth.length;
//         return {
//             id: index + 1,
//             depth: textIndex,
//             text: depth[textIndex - 1],
//             depthIndicator: '',
//         }
//     });

//     console.log(result);
// });

const data = [
    { id: 1, depth: 1, text: '.gitignore', depthIndicator: '' },
    { id: 2, depth: 1, text: '.node-version', depthIndicator: '' },
    { id: 3, depth: 1, text: 'README.md', depthIndicator: '' },
    { id: 4, depth: 1, text: 'package.json', depthIndicator: '' },
    { id: 5, depth: 1, text: 'public', depthIndicator: '' },
    { id: 6, depth: 2, text: 'favicon.ico', depthIndicator: '' },
    { id: 7, depth: 2, text: 'index.html', depthIndicator: '' },
    { id: 8, depth: 2, text: 'manifest.json', depthIndicator: '' },
    { id: 9, depth: 2, text: 'ogImage.png', depthIndicator: '' },
    { id: 10, depth: 1, text: 'src', depthIndicator: '' },
    { id: 11, depth: 2, text: 'App.tsx', depthIndicator: '' },
    { id: 12, depth: 2, text: 'Editor.tsx', depthIndicator: '' },
    { id: 13, depth: 2, text: 'Footer.tsx', depthIndicator: '' },
    { id: 14, depth: 2, text: 'Header.tsx', depthIndicator: '' },
    { id: 15, depth: 2, text: 'Menlo-Regular.woff', depthIndicator: '' },
    { id: 16, depth: 2, text: 'app.css', depthIndicator: '' },
    { id: 17, depth: 2, text: 'editor.css', depthIndicator: '' },
    { id: 18, depth: 2, text: 'footer.css', depthIndicator: '' },
    { id: 19, depth: 2, text: 'header.css', depthIndicator: '' },
    { id: 20, depth: 2, text: 'index.tsx', depthIndicator: '' },
    { id: 21, depth: 2, text: 'react-app-env.d.ts', depthIndicator: '' },
    { id: 22, depth: 1, text: 'tsconfig.json', depthIndicator: '' },
    { id: 23, depth: 1, text: 'yarn.lock', depthIndicator: '' }
];

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

const treeStructure = convertToTree(data);
console.log(treeStructure);

import { generateTree } from './src/lib/generate-tree.js';

console.log(generateTree(treeStructure))