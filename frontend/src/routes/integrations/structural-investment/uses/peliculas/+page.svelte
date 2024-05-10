<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>
    import { onMount } from "svelte";

    let movieData = [];
    let loading = true;

    // Función asincrónica para obtener datos del reseñas desde la API
    async function getMovies() {

       //const url = 'https://imdb-top-100-movies1.p.rapidapi.com/';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'dfc6d02a2emsh256a933352cbeb3p1422d0jsn488d0fd24824',
                'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            movieData = await response.json();
            loading = false;

        } catch (error) {
            console.error(error);
        }
    }

    function createGraph() {

        const data = movieData.map((movie, index) => ({
            x: index + 1, 
            y: parseFloat(movie.rating),
            title: movie.title,
            rating: parseFloat(movie.rating)
        }));

        Highcharts.chart('myChart', {
            chart: {
                type: 'scatter'
            },
            title: {
                text: 'Nota media por película'
            },
            xAxis: {
                title: {
                    text: 'Películas'
                }
            },
            yAxis: {
                title: {
                    text: 'Calificación'
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.title}: {point.rating}'
            },
            series: [{
                name: 'Nota media de la película',
                color: 'rgba(128, 0, 128, 0.2)',
                data: data
            }]
        });
    }



    onMount(async () => {
        await getMovies();
        console.log(movieData);
        createGraph();
    });

</script>

<e> Nota media por película </e>
{#if loading}
    <p>Cargando datos...</p>
{:else}
    <div id="myChart" ></div>
{/if}

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

    p {
        text-align: center;
    }
</style>
