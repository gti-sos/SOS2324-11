<script>
    import { onMount } from "svelte";

    let animeData = [];

    onMount(async () => {
        await getAnime();
    });

    async function getAnime() {
        const url = 'https://myanimelist.p.rapidapi.com/anime/top/%7Bcategory%7D';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dfc6d02a2emsh256a933352cbeb3p1422d0jsn488d0fd24824',
                'X-RapidAPI-Host': 'myanimelist.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            animeData = await response.json();
            console.log(animeData);
        } catch (error) {
            console.error(error);
        }
    }

</script>

<e> Top 50 amines </e>

<div class="card-container">
    {#if animeData.length > 0}
        {#each animeData as anime}
            <div class="card">
                <t>{anime.title}</t>
                <s>{anime.aired_on}</s>
                <s>{anime.type}</s>
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
        color: #ff4a9e;
        text-shadow: 2px 2px 4px rgba(254, 0, 0, 0.5);
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
        margin-bottom: 20px;
    }

    t {
        font-family: '';
        font-size: 40px;
        color: #0e2ac8;
        text-shadow: 2px 2px 4px rgba(111, 54, 191, 0.5);
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
    }

    s {
        font-family: '';
        font-size: 40px;
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