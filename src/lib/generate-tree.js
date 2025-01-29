import { LINE_STRINGS } from "./line-strings.js";

const defaultOptions = {
    charset: 'utf-8',
    trailingSlashDir: false,
    fullPath: false,
    rootDot: true,
};

/**
 * Generates an ASCII tree diagram, given a FileStructure
 * @param structure The FileStructure object to convert into ASCII
 * @param options The rendering options
 */
export const generateTree = (structure, options = defaultOptions) => {
    return [getLine(structure, {...defaultOptions, ...options}), structure.children.map(c => generateTree(c, options))]
        .flat(Infinity)
        // Remove null entries. Should only occur for the very first node
        // when options.rootDot === false
        .filter(line => line != null)
        .join('\n');
}

/**
 * Returns a line of ASCII that represents
 * a single FileStructure object
 * @param structure the file to render
 * @param option the rendering options
 */
const getLine = (structure, options) => {
    const lines = LINE_STRINGS[options.charset];

    if (!structure.parent) {
        return options.rootDot ? structure.name : null;
    }

    const chunks = [
        isLastChild(structure) ? lines.LAST_CHILD : lines.CHILD,
        getName(structure, options)
    ];

    let current = structure.parent;
    while (current && current.parent) {
        chunks.unshift(isLastChild(current) ? lines.EMPTY : lines.DIRECTORY);
        current = current.parent;
    }

    // Join all the chunks together to create the final line.
    // If we're not rendering the root '.' chop off the first 4 characters.
    return chunks.join('').substring(options.rootDot ? 0 : lines.CHILD.length);
}

/**
 * Returns the name of a file or folder according to the
 * rules specified by the rendering rules
 * @param structure the file or folder to get the name of
 * @param options the rendering options
 */
const getName = (structure, options) => {
    const nameChunks = [structure.name];

    // Optionally append a trailing slash
    if (
        // if the trailing slash option is enabled
        options.trailingSlashDir &&
        // and if the item has at least one child
        structure.children.length > 0 &&
        // and if the item doesn't already have a trailing slash
        !/\/\s*$/.test(structure.name)) {
        nameChunks.push('/');
    }

    // Optionally prefix the name with its full path
    if (options.fullPath && structure.parent) {
        nameChunks.unshift(
            getName(
                structure.parent,
                {...{ trailingSlashDir: true }, ...options}
            ),
        );
    }

    return nameChunks.join('');
}

/**
 * A utility function do determine if a file or folder
 * is the last child of its parent
 * @param structure The file or folder to test
 */
const isLastChild = (structure) => {
    if (structure.parent.hasOwnProperty('children')) {
        return structure.parent.children[structure.parent.children.length - 1] === structure;
    } else {
        return false;
    }
}