<script>
    import generate from "$lib/generate";
    import ContrastGrid from "./ContrastGrid.svelte";

    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button } from "$lib/components/ui/button";

    let colors = [];
    export let color = null;

    $: if (color && color.match(/^#[0-9a-fA-F]{6}$/i)) {
        const { shades } = generate(color);
        colors = shades;
        console.log(shades);
    }
</script>

{#if color && colors.length > 0}
    <section class="mt-8 grid grid-cols-10 min-h-[150px] gap-2">
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

    <!-- CONTRAST GRID -->
    <AlertDialog.Root class="!w-[50rem]">
        <AlertDialog.Trigger asChild let:builder>
            <Button builders={[builder]} variant="outline"
                >Show Contrast Grid</Button
            >
        </AlertDialog.Trigger>
        <AlertDialog.Content>
            <AlertDialog.Header>
                <AlertDialog.Title>Contrast Grid</AlertDialog.Title>
                <AlertDialog.Description>
                    <ContrastGrid {colors} />
                </AlertDialog.Description>
            </AlertDialog.Header>
        </AlertDialog.Content>
    </AlertDialog.Root>
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
