<script>
    import chroma from "chroma-js";
let Arr = [

];
let colors=0;
function rnd(){
      return chroma.random().hex().toUpperCase();
    }
Arr.forEach((row) => {
  row.forEach((element) => {
    colors += element;
  });
});
console.log(" the array is:" + colors);
</script>

<h1>the array is: {colors}</h1>


