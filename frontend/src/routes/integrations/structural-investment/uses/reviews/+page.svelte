<svelte:head>

    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/treemap.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>

    import { onMount } from "svelte";

    let reseñasData = [];
    let loading = true;

    // Función asincrónica para obtener datos del reseñas desde la API
    async function getReseñas() {
        
        const url = 'https://amazonlive.p.rapidapi.com/reviews?asin=B0BBLT626J&location=de&page=1&amount=10';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'e1ea75b4eemsh03c06dd38996c18p18d0cdjsnc0e35bfe03d4',
                'X-RapidAPI-Host': 'amazonlive.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            reseñasData = await response.json();
            console.log(reseñasData);
            loading = false;

        } catch (error) {
            console.error(error);
        }
    }

    function createGraph(reseñasData) {

        const palette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

        Highcharts.chart('reseñasGraph', {
            chart: {
                type: 'treemap'
            },
            title: {
                text: ''
            },
            series: [{
                name: 'Reseñas',
                data: reseñasData.map(item => ({
                    name: item.author,
                    value: item.rating,
                    color: palette[Math.floor(Math.random() * palette.length)]
                })),
                dataLabels: {
                    enabled: true,
                    format: '<b>Alías:{point.name}</b><br>Rating: {point.value}',
                    color: 'black'
                },
                point: {
                    events: {
                        click: function () {
                            alert(`Author: ${this.name}\nRating: ${this.value}`);
                        }
                    }
                }
            }],
            plotOptions: {
                series: {
                    point: {
                        events: {
                            click: function () {
                                alert(`Author: ${this.name}\nRating: ${this.value}`);
                            }
                        }
                    }
                }
            }
        });
    }


    onMount(async () => {
        await getReseñas();
        createGraph(reseñasData);
    });

</script>


<e>Reseñas de productos de amazon por usuarios(alías) </e>

{#if loading}
    <p>Cargando datos...</p>
{:else}
    <div id="reseñasGraph"></div>
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