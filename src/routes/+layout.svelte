<script>
    import "../app.pcss";
    import { Button } from "$lib/components/ui/button";
</script>

<header class="border-b shadow py-4">
    <div class="container flex justify-between items-center">
        <h1 class="text-xl font-medium">
            <a href="/">Color Palette</a>
         </h1>
        
        <a class="text-lg" href="/saved">
            <Button>Saved</Button>
        </a>
    </div>
</header>

<div class="container">
    <slot/>

</div>  

