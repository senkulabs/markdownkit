<script>
    let tableData = $state([
        ['Header 1', 'Header 2', 'Header 3'],
        ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3']
    ]);

    let aligments = $state(['left', 'left', 'left']);
    let output = $state('');
    let copied = $state(false);
    let shared = $state(false);

    $effect(() => {
		const url = new URL(window.location.href);
		const searchParams = url.searchParams;

		if (searchParams.has('content')) {
			// @ts-ignore
			let content = JSON.parse(atob(searchParams.get('content')));
            if (content.hasOwnProperty('tableData')) {
                tableData = content.tableData;
            }
            if (content.hasOwnProperty('aligments')) {
                aligments = content.aligments;
            }
		}
	});

    function addRow() {
        const newRow = new Array(tableData[0].length).fill('New Cell');
        tableData = [...tableData, newRow];
    }

    function addColumn() {
        const newTableData = tableData.map(row => [...row, 'New Cell']);
        tableData = newTableData;
        aligments = [...aligments, 'left'];
    }

    /**
	 * @param {number} rowIndex
	 */
    function removeRow(rowIndex) {
        if (tableData.length > 2) {
            const newTableData = tableData.filter((_, index) => index !== rowIndex);
            tableData = newTableData;
        }
    }

    /**
	 * @param {any} colIndex
	 */
    function removeColumn(colIndex) {
        if (tableData[0].length > 1) {
            const newTableData = tableData.map(row => row.filter((_, index) => index !== colIndex));
            tableData = newTableData;
            aligments = aligments.filter((_, index) => index !== colIndex);
        }
    }

    /**
	 * @param {string | number} colIndex
	 */
    function cycleAlignment(colIndex) {
        const alignmentCycle = ['left', 'center', 'right'];
        const currentIndex = alignmentCycle.indexOf(aligments[colIndex]);
        const newAlignments = [...aligments];
        newAlignments[colIndex] = alignmentCycle[(currentIndex + 1) % 3];
        aligments = newAlignments;
    }

    function generateMarkdown() {
        // Find the maximum width for each column
        const columnWidths = tableData[0].map((_, colIndex) => {
            return Math.max(...tableData.map(row => row[colIndex].length));
        });

        // Generate header row
        const headerRow = '| ' + tableData[0].map((header, i) => 
            header.padEnd(columnWidths[i], ' ')
        ).join(' | ') + ' |';

        // Generate alignment row with proper spacing
        const alignmentRow = '|' + aligments.map((align, i) => {
            const width = columnWidths[i] + 2; // Add 2 for the padding spaces
            switch(align) {
                case 'left':
                    return ':' + '-'.repeat(width - 1);
                case 'center':
                    return ':' + '-'.repeat(width - 2) + ':';
                case 'right':
                    return '-'.repeat(width - 1) + ':';
                default:
                    return '-'.repeat(width);
            }
        }).join('|') + '|';

        // Generate data rows with proper spacing
        const dataRows = tableData.slice(1).map(row => 
            '| ' + row.map((cell, i) => 
                cell.padEnd(columnWidths[i], ' ')
            ).join(' | ') + ' |'
        );

        // Combine all parts
        const markdown = [headerRow, alignmentRow, ...dataRows].join('\n');

        output = markdown;
    }

    async function copyMarkdown() {
        try {
			await navigator.clipboard.writeText(output);
			copied = true;

			// Reset the "copied" message after 2 seconds
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy text:', error);
		}
    }

    async function shareMarkdown() {
        try {
            let content = {
                tableData,
                aligments
            };
			let url = new URL(window.location.origin);
			url.pathname = '/table';
			url.searchParams.append('content', btoa(JSON.stringify(content)));
			if (navigator.canShare()) {
				await navigator.share(url.href);
			} else {
				await navigator.clipboard.writeText(url.href);
			}

			shared = true;

			setTimeout(() => {
				shared = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to shared', error);
		}
    }
</script>

<div class="container p-2 mx-auto">
    <div style="overflow-x: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1rem;">
            <thead>
                <tr>
                    <th></th>
                    {#each tableData[0] as _, colIndex}
                        <th style="padding: .5rem; border: 1px solid gray;">
                            <div>
                                <button onclick={() => cycleAlignment(colIndex)}>Align</button>
                                <button onclick={() => removeColumn(colIndex)}>Remove column</button>
                            </div>
                        </th>
                    {/each}
                    <th>
                        <button onclick={addColumn}>Add column</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each tableData as row, rowIndex}
                    <tr>
                        <td style="padding: .5rem;">
                            {#if rowIndex > 0}
                            <button onclick={() => removeRow(rowIndex)}>Delete row</button>
                            {/if}
                        </td>                
                        {#each row as cell, colIndex}
                            <td style="padding: .5rem; border: 1px solid gray;">
                                <input type="text" bind:value={tableData[rowIndex][colIndex]}
                                style:text-align={aligments[colIndex] === 'left' ? 'left' : aligments[colIndex] === 'center' ? 'center' : 'right'}
                                style="width: 100%; padding: .25rem; border: 1px solid gray;" />
                            </td>
                        {/each}
                        <td>&nbsp;</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    
        <div style="margin-bottom: 1rem;">
            <button onclick={addRow}>Add row</button>
            <button onclick={generateMarkdown}>Generate markdown</button>
            <button onclick={copyMarkdown} disabled={output ? false : true}>{copied ? 'Copied' : 'Copy markdown'}</button>
            <button onclick={shareMarkdown} disabled={output ? false : true}>{shared ? 'Shared' : 'Share markdown'}</button>
        </div>
    
        {#if output}
            <pre style="overflow-x: auto; padding: 1rem;">{output}</pre>
        {/if}
    </div>
</div>