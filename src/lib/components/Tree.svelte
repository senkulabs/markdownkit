<script>
	import { generateTree } from '$lib/generate-tree';
	import { parseInput } from '$lib/parse-input';

	const initialValue = `Edit me to generate
      a
        nice
          tree
            diagram!
            :)
      Use indentation
        to indicate
          file
          and
          folder
          nesting.
        - You can even
          - use
            - markdown
            - bullets!`.trim();

	let value = $state(initialValue);
	let copied = $state(false);
	let shared = $state(false);
	let fancyMode = $state(true);
	let showTrailingSlashDir = $state(true);
	let showFullPath = $state(false);
	let showRootDot = $state(true);

	/**
	 * @type {HTMLTextAreaElement}
	 */
	let textarea;

	$effect(() => {
		const url = new URL(window.location.href);
		const searchParams = url.searchParams;

		if (searchParams.has('content')) {
			// @ts-ignore
			value = JSON.parse(atob(searchParams.get('content')));
		}

		if (searchParams.has('options')) {
			// @ts-ignore
			let options = JSON.parse(atob(searchParams.get('options')));
			fancyMode = options.charset === 'utf-8' ? true : false;
			showTrailingSlashDir = options.trailingSlashDir;
			showFullPath = options.fullPath;
			showRootDot = options.rootDot;
		}
	});

	$effect(() => {
		textarea.focus();
		// Move cursor to the end of text
		const length = textarea.value.length;
		textarea.setSelectionRange(length, length);
	});

	const options = $derived({
		charset: fancyMode ? 'utf-8' : 'ascii',
		trailingSlashDir: showTrailingSlashDir,
		fullPath: showFullPath,
		rootDot: showRootDot
	});

	function handleTabKey(event) {
		if (event.key === 'Tab') {
			event.preventDefault();

			const { selectionStart, selectionEnd } = event.target;
			const value = event.target.value;

			// Insert tab at cursor position
			event.target.value =
				value.substring(0, selectionStart) + `\t` + value.substring(selectionEnd);

			// Move cursor after tab
			event.target.setSelectionRange(selectionStart + 1, selectionStart + 1);
		}
	}

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(generateTree(parseInput(value), options));
			copied = true;

			// Reset the "copied" message after 2 seconds
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (error) {
			console.error('Failed to copy text:', error);
		}
	}

	async function handleShare() {
		try {
			let url = new URL(window.location.origin);
			url.pathname = '/tree';
			url.searchParams.append('content', btoa(JSON.stringify(value)));
			url.searchParams.append('options', btoa(JSON.stringify(options)));
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

	function handleFancyMode() {
		fancyMode = !fancyMode;
	}

	function handleTrailingSlashDir() {
		showTrailingSlashDir = !showTrailingSlashDir;
	}

	function handleFullPath() {
		showFullPath = !showFullPath;
	}

	function handleRootDot() {
		showRootDot = !showRootDot;
	}
</script>

<div class="container p-2 mx-auto">
	<div class="editor">
		<textarea
			bind:this={textarea}
			style="width: 100%; height: 320px; tab-size: 2; font-size: 1rem;"
			bind:value
			onkeydown={handleTabKey}
		></textarea>
		<div class="tree">
			{generateTree(parseInput(value), options)}
		</div>
	</div>
	<div class="control">
		<button onclick={handleCopy}>{copied ? 'Copied' : 'Copy'}</button>
		<button onclick={handleShare}>{shared ? 'URL copied' : 'Share'}</button>
		<label for="fancy-mode">
			<input type="checkbox" id="fancy-mode" onchange={handleFancyMode} checked={fancyMode} />Fancy
		</label>
		<label for="trailing-mode">
			<input
				type="checkbox"
				id="trailing-mode"
				onchange={handleTrailingSlashDir}
				checked={showTrailingSlashDir}
			/>Trailing /
		</label>
		<label for="fullpath-mode">
			<input
				type="checkbox"
				id="fullpath-mode"
				onchange={handleFullPath}
				checked={showFullPath}
			/>Full Path
		</label>
		<label for="root-dot-mode">
			<input
				type="checkbox"
				id="root-dot-mode"
				onchange={handleRootDot}
				checked={showRootDot}
			/>Root .
		</label>
	</div>
</div>

<style>
  .editor {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    gap: 1rem;
  }
  
  @media screen and (min-width: 960px) {
    .editor {
      flex-direction: row;
      align-items: initial;
    }
  }
  
  .tree {
    width: 100%;
    height: 320px;
    white-space: pre;
    font-family: monospace;
    font-size: 0.875rem;
    line-height: 2;
    overflow: auto;
    background: lightgray;
    padding: 1rem;
    border-radius: .5rem;
  }
  
  .control {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    /* Make space between .editor and .control */
    margin-top: 1rem;
    /* Make .tree align with .control */
    margin-right: 2rem;
  }
</style>