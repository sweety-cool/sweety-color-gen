<script>
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import db from "$lib/db";

    import Button from "$lib/components/ui/button/button.svelte";
    import Palette from "$lib/components/Palette.svelte";


    let brandColor = "#5A03D5";
    let colors = [];

    function rnd(){
      return "#" + Math.floor(Math.random()*16777215).toString(16).toUpperCase();
    }

    function generate() {
      colors.push(brandColor);
      colors = colors;
      brandColor = rnd();
    }

    let saveDialogOpen = false;
    let saveName = "";
    const saveStart = () => saveDialogOpen = true;
    function save() {
      db.colors.add({ name: saveName, hex: brandColor, time: Date.now() });
      saveName = "";
    }
</script>



<h1 class="text-5xl font-medium mt-10 lg:mt-20 text-center">Generate color pallete</h1>
<div class="mt-8 flex mx-auto max-w-sm items-center gap-2">
  <Input class="text-base" type="text" placeholder="hexcode" bind:value={brandColor}/>
  <Button on:click={generate}>Generate</Button>
  <Button variant="outline" on:click={saveStart}>Save</Button>
</div>

<Palette color={brandColor} />


<AlertDialog.Root bind:open={saveDialogOpen}>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Please give a name</AlertDialog.Title>
      <Input class="my-5" type="text" placeholder="Name" bind:value={saveName}/>
      <!-- <Palette color={brandColor} /> -->

    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action on:click={save} disabled={saveName.length < 1}>Save</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>