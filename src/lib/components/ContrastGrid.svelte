<script>
    import chroma from "chroma-js";
    export let colors = [];

    let allColors = [...colors];

    function contrast(color1, color2) {
        return chroma.contrast(color1, color2).toFixed(1);
    }

    let v = 4.5;
    function condition(color1, color2) {
        return contrast(color1, color2) >= v;
    }
</script>

<section class="grid gap-1.5 mt-4">
    <header class="grid cols gap-1.5">
        <div></div>
        {#each allColors as c2}
            <div class="w-12 flex items-center justify-center text-sm mb-1">{c2.number}</div>
        {/each}
    </header>
    {#each allColors as c1}
        <section class="grid cols gap-1.5">
            <div class="flex items-center justify-center text-sm">{c1.number}</div>
            {#each allColors as c2}
                <div
                    class="box"
                    style="--c1: {c1.hexcode}; --c2: {c2.hexcode};"
                    class:show={condition(c1.hexcode, c2.hexcode)}
                >
                    {contrast(c1.hexcode, c2.hexcode)}
                </div>
            {/each}
        </section>
    {/each}
</section>

<style lang="postcss">
    .box {
        @apply w-12 h-12 border rounded-md text-xs font-medium;
        @apply flex items-center justify-center;
        @apply bg-muted text-transparent;
    }
    .box.show {
        background: var(--c2) !important;
        @apply text-black;
    }
    .cols {
        grid-template-columns: repeat(12, minmax(0, 1fr));
    }
</style>
