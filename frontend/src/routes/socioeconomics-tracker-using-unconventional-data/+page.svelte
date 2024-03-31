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

    onMount(()=>{
        getData();
    })

    async function getData(){
        try{
            let response = await fetch(API, {
                                method: "GET"
                        });

            let dat = await response.json();
            data = dat;
            console.log(data);
        }catch(e){
            Msg = e;
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

<table>
    <thead>
        <th>Fecha</th>
        <th>Año</th>
        <th>Mes</th>
        <th> Dia</th>
        <th>Recuento de cantidad de documentos </th>
        <th>Tasa de popularidad</th>
        <th>Cantidad media</th>
        <th>Cantidad con peso media</th>
        <th>tone_cum</th>
        <th>Codigo amd1</th>
        <th>Pais</th>
        <th>Area</th>
        <th>Referencia de tiempo</th>
        <th>Tema</th>
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
    </tbody>
</table>


<ul>
    
    {#each data as d}
        <li><a href="/socioeconomics-tracker-using-unconventional-data/{d.country}/{d.year}/{d.day}">{d.country}-{d.year}-{d.day}</a><button on:click="{deleteData(d.country, d.year, d.day)}">Borrar</button>
        </li>
    {/each}
</ul>

<button on:click="{createData}">Crear nuevo dato</button>
<button on:click="{deleteAllData}">Eliminar todos los datos</button>

{#if Msg != ""}
MENSAJE: {Msg}
{/if}

