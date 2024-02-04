<script>
    import "../app.pcss";
</script>

<header class="border-b shadow py-4">
    <div class="container flex justify-between">
        <h1 class="text-lg font-medium uppercase">
            <a href="/">Color pallete</a>
         </h1>
        
        <a class="text-lg font-semibold" href="/saved">Saved</a>
        <a class="text-lg font-semibold" href="/grid">Contrast Grid</a>
    </div>
</header>

<div class="container">
    <slot/>

</div>  

