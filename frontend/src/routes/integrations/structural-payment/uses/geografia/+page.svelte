<script>
    import { onMount } from "svelte";

    let geographicalData = [];

    onMount(async () => {
        await getData();
    });

    async function getData() {
        const url = 'https://ai-weather-by-meteosource.p.rapidapi.com/find_places_prefix?text=fishermans%20wh&language=en';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'adeede387emsh91b03dc6a809ef8p11c7f5jsn012824a94b45',
                'X-RapidAPI-Host': 'ai-weather-by-meteosource.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            geographicalData = await response.json();
            console.log(geographicalData);
        } catch (error) {
            console.error(error);
        }
           
    }

</script>

<e> Información geográfica </e>

<div class="card-container">
    
    
    {#if geographicalData.length > 0}
        {#each geographicalData as dato}
            <div class="card">
                <ul>
                    <t>Nombre: {dato.name}</t>
                    <s>ID: {dato.place_id}</s>
                    <s>Area 1: {dato.adm_area1}</s>
                    <s>Area 2: {dato.adm_area2}</s>
                    <s>País: {dato.country}</s>
                    <s>Latitud: {dato.lat}</s>
                    <s>Longitud: {dato.lon}</s>
                    <s>Zona horaria: {dato.timezone}</s>
                    <s>Tipo: {dato.type}</s>
                  </ul>
                 
            </div>
        {/each}
    {:else}
        <p>Cargando datos...</p>
    {/if}
</div>

<style>

    /* Estilo de textos */
    e {
        font-family: '';
        font-size: 60px;
        color: #290ef5;
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
        margin-bottom: 20px;
    }

    t {
        font-family: '';
        font-size: 30px;
        color: #62afdc;
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
    }

    s {
        font-family: '';
        font-size: 25px;
        color: #000000;
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
        text-decoration: none;
    }



    /* Estilos de las cartas */
    .card-container {
        display: flex;
        flex-wrap: wrap;
        display: flex;
        justify-content: center;
    }

    .card {
        width: 30%; 
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        background-color: #f0f8ff; 
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); 
        margin-left: 10px;
    }


</style>
