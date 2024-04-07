<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { page } from '$app/stores';

    onMount(async () => {
        getData();
    });

    let country = $page.params.country;
    let year = $page.params.year;
    let day = $page.params.day;

    let API = "/api/v2/socioeconomics-traker-using-unconventional-data";

    if (dev) {
        API = "http://localhost:10000"+API;
    }

    let dato = [];
    let result = "";
    let resultStatus = "";
    let message = "";

    async function getData() {
        resultStatus = result = "";
        const res = await fetch(API+"/"+country+"/"+parseInt(year)+"/"+parseInt(day), {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            updatedDate = dato.date;
            updatedYear = dato.year;
            updatedMonth = dato.month;
            updatedDay = dato.day;
            updatedTone_doc_count = dato.tone_doc_count;
            updatedPopularity_rate = dato.popularity_rate;
            updatedTone_avg = dato.tone_avg;
            updatedTone_w_avg = dato.tone_w_avg;
            updatedTone_cum = dato.tone_cum;
            updatedAmd1code = dato.amd1code;
            updatedCountry = dato.country;
            updatedArea = dato.area;
            updatedRef_time = dato.ref_time;
            updatedTopic = dato.topic;
            
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 404) {
            message = `El elemento: ${country} ${year} ${day}; No encontrado`;
        }
        if (status == 500) {
            message = "Error interno";
        }
    }

    let updatedDate = "";
    let updatedYear = year;
    let updatedMonth = "";
    let updatedDay = day;
    let updatedTone_doc_count = "";
    let updatedPopularity_rate = "";
    let updatedTone_avg = "";
    let updatedTone_w_avg = "";
    let updatedTone_cum = "";
    let updatedAmd1code = "";
    let updatedCountry = country;
    let updatedArea = "";
    let updatedRef_time = "";
    let updatedTopic = "";

    async function updateData() {
        resultStatus = result = "";
        const res = await fetch(API+"/"+country+"/"+parseInt(year)+"/"+parseInt(day), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                date: updatedDate,
                year: updatedYear,
                month: updatedMonth,
                day: updatedDay,
                tone_doc_count: updatedTone_doc_count,
                popularity_rate: updatedPopularity_rate,
                tone_avg: updatedTone_avg,
                tone_w_avg: updatedTone_w_avg,
                tone_cum: updatedTone_cum,
                amd1code: updatedAmd1code,
                country: updatedCountry,
                area: updatedArea,
                ref_time: updatedRef_time,
                topic: updatedTopic,
                
            }),
        });
        const status = await res.status;
        resultStatus = status;

        if (status == 200) {
            message = "El dato se ha actualizado";
            getData();
        } else if (status == 400) {
            message = "Rellena todos los campos";
        } else if (status == 500) {
            message = "Error interno";
        }
    }


</script>


<br>
<br>
<br>

<div id="message-container">
    {#if message != ""}
    {message}
    {/if}
</div>

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
                <input bind:value={updatedDate}>
            </td>
            <td>
                {updatedYear} 
            </td>
            <td>
                <input bind:value={updatedMonth}> 
            </td>
            <td>
                {updatedDay}  
            </td>
            <td>
                <input bind:value={updatedTone_doc_count}> 
            </td>
            <td>
                <input bind:value={updatedPopularity_rate}> 
            </td>
            <td>
                <input bind:value={updatedTone_avg}> 
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
            <input bind:value={updatedTone_w_avg}> 
        </td>
        <td>
            <input bind:value={updatedTone_cum}> 
        </td>
        <td>
            <input bind:value={updatedAmd1code}> 
        </td>
        <td>
            {updatedCountry}
        </td>
        <td>
            <input bind:value={updatedArea}> 
        </td>
        <td>
            <input bind:value={updatedRef_time}> 
        </td>
        <td>
            <input bind:value={updatedTopic}> 
        </td>
    </tr>
</table>



<button class="button" on:click="{updateData}">Actualizar dato</button>

{#if message != ""}
{message}
{/if}

<style>
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




