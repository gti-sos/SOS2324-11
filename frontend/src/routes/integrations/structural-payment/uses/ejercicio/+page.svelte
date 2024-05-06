<script>
    import { onMount } from "svelte";

    let geographicalData = [];

    onMount(async () => {
        await getData();
    });
    async function getData() {
        const url = 'https://work-out-api1.p.rapidapi.com/search?Muscles=biceps';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'adeede387emsh91b03dc6a809ef8p11c7f5jsn012824a94b45',
                'X-RapidAPI-Host': 'work-out-api1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const geographicalData = await response.text();
            console.log(geographicalData);
        } catch (error) {
            console.error(error);
        }
        
           
    }

</script>

<e> Información </e>

<div class="card-container">
    
    {#if geographicalData.length > 0}
        {#each geographicalData as workout}
            <div class="card">
                <li>Muscle: {workout.Muscle}</li>
                <li>Sets: {workout.WorkOut}</li>
                <li>Sets: {workout.Sets}</li>
                <li>Reps: {workout.Reps}</li>
                <li>Breaks: {workout.Breaks}</li>
                <li>Equipments: {workout.Equipments}</li>
                <li>Explaination: {workout.Explaination}</li>
                 
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