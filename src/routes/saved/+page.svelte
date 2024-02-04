<script>
    import db from "$lib/db";
    import Palette from "@/components/Palette.svelte";
    import { Button } from "$lib/components/ui/button";
    import { liveQuery } from "dexie";

    const colors = liveQuery(() => db.colors.reverse().toArray());
</script>

<div class="mt-10">
    {#if $colors}
        {#if $colors.length === 0}
            <p class="text-muted-foreground text-center pt-10">
                No colors saved yet
            </p>
            <p class="text-center mt-5">
                <Button href="/" variant="secondary">Go to generate ⟶</Button>
            </p>
        {/if}
        {#each $colors as c}
            <div class="-mb-5 mt-8 flex justify-between">
                <h2 class="text-xl font-semibold capitalize ">{c.name}</h2>
                <p class="text-gray-500 text-sm">{new Date(c.time).toLocaleString()}</p>
            </div>
            <Palette color={c.hex} />
        {/each}
    {/if}
</div>
