<script>
  export let tipo; 
  export let mensaje;
  let timeoutMessage;
  let isVisible = false; 

  $: {
      if (mensaje) {
          clearTimeout(timeoutMessage);
          timeoutMessage = setTimeout(() => {mensaje = ''; }, 10000);
          isVisible = true; 
      } else {
          isVisible = false;
      }
  }
</script>

  
<div class={tipo === 'exito' ? 'mensaje-exito' : 'mensaje-error'} style="display: {isVisible ? 'block' : 'none'};">
  {mensaje}
</div>

  
<style>
    .mensaje-exito, .mensaje-error {
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      color: #fff;
      font-weight: bold;
      display: none; 
      font-size: 30px;
    }
  
    .mensaje-exito {
      background-color: #5cb85c; 
    }
  
    .mensaje-error {
      background-color: #d9534f; 
    }
</style>