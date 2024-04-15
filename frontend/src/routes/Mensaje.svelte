<script>

  export let tipo; 
  export let mensaje;
  let timeoutMessage;
  let isVisible = false; 

  $: { // Para controlar la visibilidad del mensaje
      if (mensaje) { // Comprueba si hay un mensaje definido
          clearTimeout(timeoutMessage); // Si hay un mensaje, se borra el temporizador existente para evitar que se borre antes de tiempo
          timeoutMessage = setTimeout(() => { mensaje = ''; }, 10000); // Se inicia un nuevo temporizador para borrar el mensaje después de 10 segundos
          isVisible = true;  // Establece isVisible en true para mostrar el mensaje
      } else {
          isVisible = false; // Si no hay mensaje, establece isVisible en false para ocultar el mensaje
      }
    }

</script>

<!--  Tipo del mensaje y mosntrar el mensaje-->
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