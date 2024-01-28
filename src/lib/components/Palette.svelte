<script>
    import generate from "$lib/generate";
    export let color = null;
    let colors = [];

    $: if(color && color.match(/^#[0-9a-fA-F]{6}$/i)) {
        const {shades} = generate(color);
        colors = shades;
        console.log(shades);
    }
</script>

{#if color && colors.length > 0}
    <div class="mt-8 grid grid-cols-10 min-h-[150px] gap-2">
        {#each colors as c}
            <div class="color-card" style="--color: {c.hexcode};" class:alt={c.luminance < 30}>
                {c.number}<br>{c.hexcode}
            </div>
        {/each}
    </div>
{/if}

<style lang="postcss">
    .color-card {
        @apply p-4 uppercase rounded-lg;
        @apply flex h-full items-end;
        @apply font-medium;
        background: var(--color);
    }
    .color-card.alt {
        @apply text-white;
    }
</style>