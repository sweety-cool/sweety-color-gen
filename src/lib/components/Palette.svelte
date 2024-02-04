<script>
    import generate from "$lib/generate";
    import ContrastGrid from "./ContrastGrid.svelte";

    import * as Dialog from "$lib/components/ui/dialog";
    import { Button } from "$lib/components/ui/button";

    let colors = [];
    export let color = null;

    $: if (color && color.match(/^#[0-9a-fA-F]{6}$/i)) {
        const { shades } = generate(color);
        colors = shades;
    }
</script>

{#if color && colors.length > 0}
    <section class="mt-8 grid grid-cols-11 min-h-[150px] gap-2">
        {#each colors as c}
            <div
                class="color-card"
                style="--color: {c.hexcode};"
                class:alt={c.luminance < 30}
            >
                {c.number}<br />{c.hexcode}
            </div>
        {/each}
    </section>

    <section class="flex justify-end mt-3">
        <!-- CONTRAST GRID -->
        <Dialog.Root>
            <Dialog.Trigger>
                <Button variant="outline" class="font-semibold" size="sm">Contrast Grid</Button>
            </Dialog.Trigger>
            <Dialog.Content class="max-w-[52rem]">
                <Dialog.Header>
                    <Dialog.Title>Contrast Grid</Dialog.Title>
                    <Dialog.Description>
                        See the contrast of colors, compared to the other colors in the palette.
                    </Dialog.Description>
                </Dialog.Header>
                <div class="m-auto">
                    <ContrastGrid {colors} />
                </div>
            </Dialog.Content>
        </Dialog.Root>
    </section>
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
