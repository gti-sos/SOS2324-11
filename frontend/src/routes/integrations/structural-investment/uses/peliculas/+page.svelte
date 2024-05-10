<script>

    import { onMount } from "svelte";
    import Chart from 'chart.js/auto';

    let movieData = [];
    let loading = true;

    // Función asincrónica para obtener datos de las peliculas desde la API
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
            console.log(movieData);
            let loading = false;

        } catch (error) {
            console.error(error);
        }
    }

    function createGraph() {

        const ctx = document.getElementById('myChart').getContext('2d');
        const titles = movieData.map(movie => movie.title);
        const ratings = movieData.map(movie => movie.rating);

        new Chart(ctx, {
            type: 'scatter',
            data: {
                labels: titles,
                datasets: [{
                    label: 'Nota media de la película',
                    data: ratings.map((rating, index) => ({ x: index, y: rating, title: titles[index], rating: rating })),
                    backgroundColor: 'rgba(128, 0, 128, 0.2)', 
                    borderColor: 'rgba(128, 0, 128, 1)', 
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Calificación'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Películas'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                var label = context.dataset.label || '';
                                if (context.parsed.x !== null && context.parsed.y !== null) {
                                    label +=  ":" + '\n'  +context.dataset.data[context.dataIndex].rating;
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }


    onMount(async () => {
        await getMovies();
        createGraph();
    });

</script>


<e> Nota media por película </e>
{#if loading}
    <p>Cargando datos...</p>
{:else}
    <canvas id="myChart" width="800" height="240"></canvas>
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

    p{
        text-align: center;
    }

</style>