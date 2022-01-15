<!--
	Original code from: https://github.com/kroniapp/svelte-swipeable-sheets/blob/master/BottomSheet.svelte
	Changed a few styles variables to make it adaptable with theme.
-->
<script lang="ts">
	let dialog;
	let backdrop;
	let startX;
	let startY;
	let direction;
	export let open = false;
	export let threshold = 0.3;
	export let backdropOpacity = 0.5;
	export let speed = 0.2;
	const touch = (e) => (e.changedTouches ? e.changedTouches[0] : e);
	const deltaX = (e) => startX - touch(e).clientX;
	const deltaY = (e) => startY - touch(e).clientY;
	const touchStart = (e) => {
		startX = touch(e).clientX;
		startY = touch(e).clientY;
	};
	const touchMove = (e) => {
		if (!direction) {
			direction = Math.abs(deltaY(e)) > Math.abs(deltaX(e)) ? 'vertical' : 'horizontal';
		}
		if (deltaY(e) < 0 && direction === 'vertical') {
			dialog.style.setProperty('--b', deltaY(e) + 'px');
			backdrop.style.setProperty('--o', (1 + deltaY(e) / dialog.clientHeight) * backdropOpacity);
		}
	};
	const touchEnd = (e) => {
		if (direction === 'vertical') {
			open = -deltaY(e) / dialog.clientHeight < threshold;
		}
		startY = null;
		direction = null;
	};
	$: if (dialog && backdrop) {
		dialog.style.setProperty('--s', speed + 's');
		backdrop.style.setProperty('--s', speed + 's');
	}
	$: if (dialog && backdrop && !direction) {
		dialog.style.setProperty('--b', open ? '0px' : -dialog.clientHeight - 20 + 'px');
		backdrop.style.setProperty('--o', open ? backdropOpacity : 0);
	}
</script>

<div
	bind:this={backdrop}
	class="backdrop pointer-events-none fixed left-0 top-0 w-full h-full backdrop-brightness-0 z-20"
	class:backdrop-open={open}
	class:backdrop-smooth={!startY}
	on:click={() => (open = false)}
/>

<nav
	bind:this={dialog}
	class="root fixed bg-white w-full overflow-x-auto left-0 z-30 border border-neutral-900 dark:bg-neutral-800"
	class:root-smooth={!startY}
	on:touchstart={touchStart}
	on:touchmove={touchMove}
	on:touchend={touchEnd}
>
	<div class="indicator mx-auto mt-2 bg-neutral-300 rounded-sm" />
	<slot />
</nav>

<style lang="postcss">
	.root {
		bottom: var(--b, -100%);
	}
	.root-smooth {
		transition: bottom calc(var(--f, 1) * var(--s, 0s)) ease-in-out;
	}
	.backdrop {
		opacity: var(--o, 0);
	}
	.backdrop-smooth {
		transition: opacity calc(var(--f, 1) * var(--s, 0s)) ease-in-out;
	}
	.backdrop-open {
		pointer-events: all;
	}
	.indicator {
		width: 20%;
		height: 5px;
	}
</style>
