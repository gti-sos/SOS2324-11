<svelte:head>

    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

</svelte:head>

<script>

     //@ts-nocheck
    import { onMount } from "svelte";

    let API = "https://api.apis.guru/v2/specs/dataatwork.org/1.0/swagger.json";

    // Función asíncrona para obtener datos de inversión desde el servidor
    async function getData() {

        try {
            let response = await fetch(API, {
                method: "GET" 
            });

            let investment = await response.json();
            data = investment;
            console.table(data);

        } catch (e) {
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e); 
        }
    }

    onMount(() => {
    getData();
    });

</script>



<h1 align="center">Integración con Proxy</h1>
<br>
<br>
<div id="columnchart_material" style="width: 800px; height: 500px; margin-left: 50px; margin-bottom:150px;"></div>

