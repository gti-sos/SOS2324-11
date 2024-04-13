<script>
    import {dev} from "$app/environment";
    let mode = "production";
    
    if(dev)
        mode="development";
</script>

<br>
<h4 style="margin-left: 20px;"> ❥ Esta es la aplicación de administrador de datos en modo {mode} </h4>