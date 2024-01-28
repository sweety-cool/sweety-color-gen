<script>
    import db from "$lib/db";
    import Palette from "@/components/Palette.svelte";
    import { liveQuery } from "dexie";

    const colors = liveQuery(() => db.colors.reverse().toArray());
</script>

<div class="mt-10">
    {#if $colors}
        {#each $colors as c}
            <div class="-mb-5 mt-8 flex justify-between">
                <h2 class="text-xl font-semibold capitalize ">{c.name}</h2>
                <p class="text-gray-500 text-sm">{new Date(c.time).toLocaleString()}</p>
            </div>
            <Palette color={c.hex} />
        {/each}
    {/if}
</div>
