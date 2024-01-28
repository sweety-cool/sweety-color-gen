
<script>
    import generate from "$lib/generate";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    import Button from "$lib/components/ui/button/button.svelte";

    let colors = [];



  function generatePallet() {
    const {shades} = generate(brandColor);
    colors = shades;
  }
    let brandColor = "#A89DB5";
</script>


<div class="border-b py-8">
  <div class="container">
      <h1 class="text-4xl font-bold"> Color pallate</h1>
  </div>
</div>


<!-- <Input  class=" m-11 w-70 h-10 p-2" type="text" bind:value={brandColor} /> -->
<div class="grid w-full max-w-sm items-center gap-1.5">
  <Label class="m-6" for="text">Hexcode</Label>
  <Input class="m-11 w-70 h-10 p-2" type="text" placeholder="hexcode" bind:value={brandColor}/>
</div>

<Button class="m-4 w-20 " on:click={generatePallet}>Click</Button>


<div class="grid grid-cols-10 min-h-[100px]">
{#each colors as c}
    <div style="background-color: {c.hexcode}; ">{c.number} - {c.hexcode}</div>
{/each}
</div>

<!-- <pre><code>{JSON.stringify(colors, null, 2)}</code></pre> -->
