<script>
    import {onMount} from "svelte";
    import {dev} from "$app/environment";
    

    let API = "/api/v2/socioeconomics-traker-using-unconventional-data";
    if(dev)
        API = "http://localhost:10000"+API;

    let data = [];
    let newData = {
        "date": "Fecha",
        "year": 0,
        "month": "Mes",
        "day": 0,
        "tone_doc_count": "Cantidad",
        "popularity_rate": "Cantidad",
        "tone_avg": "Cantidad",
        "tone_w_avg": "Cantidad",
        "tone_cum": "Cantidad",
        "amd1code": "Cantidad",
        "country": "Pais",
        "area": "Siglas",
        "ref_time": "Cantidad",
        "topic": "Cantidad",
        
    };

    
    let Msg ="";
    let limit = 10;

    onMount(()=>{
        getData();
    })

    async function getData(){
        try{
            let response = await fetch(API+`?offset=0&&limit=${limit}`, {
                                method: "GET"
                        });

            let dat = await response.json();
            data = dat;
            console.log(data);
        }catch(e){
            Msg = e;
        }
    }

    async function getInitialData() {
        let response = await fetch(API+"/loadInitialData", {
                                        method: "GET",
        });
        try {
            const dat = await res.json();
            data = dat;
        } catch (error) {
            console.log(`Error al parsear el resultado: ${error}`);
        }
        let status = await response.status;
        if(status==200){
            getData();
            Msg = "Los datos han sido insertados correctamente.";
        }
    }

    async function getNextPage() {
        let response = await fetch(API+`?offset=10&&limit=${limit}`, {
            method: "GET",
        });
        try {
            let dat = await response.json();
            data = dat;
            console.log(data);
        } catch (error) {
            console.log(`Error al parsear el resultado: ${error}`);
        }
    }

    let getFrom = null;
    let getTo = null;

    async function getFromTo(getFrom,getTo) {
            let response = await fetch(API+`?from=${getFrom}&to=${getTo}`, {
                method: "GET",
            });
            try {
                let dat = await response.json();
                data = dat;
                console.log(data);
            } catch (error) {
                console.log(`Error al parsear el resultado: ${error}`);
            }
            let status = await response.status;
            if (status == 200) {
                Msg = "Se ha realizado la petición correctamente";
            } else if (status == 400) {
                Msg = "La petición no es correcta."
            } else if (status == 500) {
                Msg = "Error del servidor";
            } 
    }

    async function createData(){
        try{
            let response = await fetch(API, {
                                method: "POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify(newData,null,2)
                        });

            let status = await response.status;
            console.log(`Creation response status ${status}`);
            if(response.status==201){
                getData();
                Msg = "El dato se ha creado correctamente";
            } else if (response.status == 409) {
                Msg = "El dato ya existe";
            }else if(response.status==400){
                Msg = "El dato no tiene los campos esperados";
            } else if (response.status == 500) {
                Msg = "Error interno";
            }else{
                Msg = "Error, código: " + response.status;
            }
        
        }catch(e){
            Msg = e;
        }
    }

    async function deleteAllData(){
        try{
            let response = await fetch(API, {
                                method: "DELETE"
                        });
            if(response.status==200){
                getData();
                Msg = "Se han eliminado todos los datos correctamente";
            } else if (response.status == 404) {
                Msg = "No se ha encontrado";
            } else if (response.status == 500) {
                Msg = "Error interno";
            }else{
                Msg = "Error, código: " + response.status;
            }
        
        }catch(e){
            Msg = e;
        }
    }

    async function deleteData(country,year,day){
        console.log(`Deleting data with country: ${country}, year: ${parseInt(year)} and day: ${parseInt(day)}`)
        try{
            let response = await fetch(API+"/"+country+"/"+parseInt(year)+"/"+parseInt(day),{
                                method: "DELETE"
                        });
            
            if(response.status==200){
                getData();
                Msg = "Dato eliminado correctamente";
            } else if (response.status == 404) {
                Msg = `No se ha encontrado el país ${ms_name} con fondo ${fund}`;
            } else if (response.status == 500) {
                Msg = "Error interno";
            }else{
                Msg = "Error, código: " + response.status;
            }
        
        }catch(e){
            Msg = e;
        }
    }

</script>

<body>

    <br> <br>
    <div id="message-container">
        {#if Msg != ""}
        {Msg}
        {/if}
    </div>

    <br>
    <br>
    
    <table class="tabla-datos">
        <thead>
            <th>Fecha</th>
            <th>Año</th>
            <th>Mes</th>
            <th> Dia</th>
            <th>Recuento de cantidad de documentos </th>
            <th>Tasa de popularidad</th>
            <th>Cantidad media</th>
        </thead>

        <tbody>
            <tr>
                <td>
                    <input bind:value={newData.date}>
                </td>
                <td>
                    <input bind:value={newData.year} type="number"> 
                </td>
                <td>
                    <input bind:value={newData.month}> 
                </td>
                <td>
                    <input bind:value={newData.day} type="number"> 
                </td>
                <td>
                    <input bind:value={newData.tone_doc_count}> 
                </td>
                <td>
                    <input bind:value={newData.popularity_rate}> 
                </td>
                <td>
                    <input bind:value={newData.tone_avg}> 
                </td>
            </tr>
        </tbody>

        <thead>
            <th>Cantidad con peso media</th>
            <th>tone_cum</th>
            <th>Codigo amd1</th>
            <th>Pais</th>
            <th>Area</th>
            <th>Referencia de tiempo</th>
            <th>Tema</th>
        </thead>

        <tr>
            <td>
                <input bind:value={newData.tone_w_avg}> 
            </td>
            <td>
                <input bind:value={newData.tone_cum}> 
            </td>
            <td>
                <input bind:value={newData.amd1code}> 
            </td>
            <td>
                <input bind:value={newData.country}> 
            </td>
            <td>
                <input bind:value={newData.area}> 
            </td>
            <td>
                <input bind:value={newData.ref_time}> 
            </td>
            <td>
                <input bind:value={newData.topic}> 
            </td>
        </tr>
    </table>


    <ul>
        
        {#each data as d}
            <li class = "dataItem"><a href="/socioeconomics-tracker-using-unconventional-data/{d.country}/{d.year}/{d.day}">{d.country}-{d.year}-{d.day}</a><button class="button" on:click="{deleteData(d.country, d.year, d.day)}">  Borrar</button>
            </li>
        {/each}
    </ul>

    <button class="button" on:click="{createData}">Crear nuevo dato</button>
    <button class="button" on:click="{deleteAllData}">Eliminar todos los datos</button>


    <br>
    <br>
    <label>
        Desde:
        <input type="number" bind:value={getFrom}>
    </label>
    <label>
        Hasta:
        <input type="number" bind:value={getTo}>
    </label>
    <button class="button" on:click={getFromTo(getFrom,getTo)}>Buscar</button>

    <!-- Agrega controles de paginación -->
    <br>
    <br>

    {#if data.length == 0}
    <button class="button" on:click="{getInitialData}">Cargar datos iniciales</button>
    {:else if data.length > 0}
    <button class="button" on:click="{getData}">Pagina anterior</button>
    <button class="button" on:click="{getNextPage}">Pagina siguiente</button>
    {/if}
</body>


<style>
    /* Estilo para la tabla */
    .tabla-datos {
        border: 2px solid #000; 
        background-color: #ADD8E6; 
        border-collapse: collapse; 
        margin-left: 10px;
        margin-right: 10px;
    }

    /* Estilo para las celdas de la tabla */
    .tabla-datos th, .tabla-datos td {
        border: 1px solid #000; 
        padding: 20px; 
        text-align: center; 
        
    }

    /* Estilo para las celdas de encabezado */
    .tabla-datos th {
        background-color: #4682B4; 
        color: white; 
        text-align: center; 
        
    }

    /* Estilo para los botones */
    .button {
    background-color: #007BFF; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    text-align: center; 
    text-decoration: none; 
    display: inline-block; 
    font-size: 16px; 
    margin: 4px 2px; 
    cursor: pointer; 
    border-radius: 4px; 
    margin-left: 1%;
    }

    .button:hover {
        background-color: #0056b3; 
    }

    /* Mensaje de error*/
    #message-container {
    padding: 10px;
    font-size: 28px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 0px;
    background-color: #f8b8a3; 
    color: #000000; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}


</style>




