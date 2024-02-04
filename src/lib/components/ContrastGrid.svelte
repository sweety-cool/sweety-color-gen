<script>
    import chroma from "chroma-js";
    export let colors = [];

    function contrast(color1, color2) {
        return chroma.contrast(color1, color2).toFixed(1);
    }

    let v = 4.5;
    function condition(color1, color2) {
        return contrast(color1, color2) > v;
    }
</script>

<br />
<br />
<!-- <pre>{JSON.stringify(colors, null, 2)}</pre> -->

<div class="grid gap-1.5 w-[38rem]">
    <header class="grid grid-cols-11 gap-1.5">
        <div></div>
        {#each colors as c2}
            <div class="w-12 flex justify-center">{c2.number}</div>
        {/each}
    </header>
    {#each colors as c1}
        <div class="grid grid-cols-11 gap-1.5">
            <div class="flex items-center">{c1.number}</div>
            {#each colors as c2}
                <div
                    class="box"
                    style="--color: {c2.hexcode};"
                    class:show={condition(c1.hexcode, c2.hexcode)}
                >
                    {contrast(c1.hexcode, c2.hexcode)}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style lang="postcss">
    .box {
        @apply w-12 h-12 border rounded-md text-sm font-medium text-transparent;
        @apply flex items-center justify-center;
        background-color: #f4f4f4;
        background: repeating-linear-gradient(
            -45deg,
            #d5d5d5,
            #d5d5d5 2px,
            #f4f4f4 2px,
            #f4f4f4 10px
        );
    }
    .box.show {
        background: var(--color) !important;
        @apply text-black;
    }
</style>
