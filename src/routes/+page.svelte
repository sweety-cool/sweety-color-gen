
<script>
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";

    import Button from "$lib/components/ui/button/button.svelte";
    import Palette from "$lib/components/Palette.svelte";


    let brandColor = "#A10310";
    let colors = [];

    function rnd(){
      return "#" + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    }

    function generate() {
      colors.push(brandColor);
      colors = colors;
      brandColor = rnd();
    }

</script>



<h1 class="text-5xl font-medium mt-10 lg:mt-20 text-center">Generate color pallete</h1>
<div class="mt-8 flex mx-auto max-w-sm items-center gap-2">
  <Input class="text-base" type="text" placeholder="hexcode" bind:value={brandColor}/>
  <Button on:click={generate}>Generate</Button>
</div>

<Palette color={brandColor} />
<!-- 
{#each colors.reverse() as c}
  <Palette color={c} />
{/each} -->