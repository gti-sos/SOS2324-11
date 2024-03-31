<script>
    import {dev} from "$app/environment";
    let mode = "production";
    
    if(dev)
        mode="development";
</script>

<br><br>
<h4>Esta es la aplicación de administrador de datos en modo {mode}</h4>