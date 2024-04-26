<svelte:head>
    
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>

    import { onMount } from "svelte";
    let dataAvailable = false;

    let DATAAPI = "https://sos2324-11.appspot.com/api/v2/structural-investment-data";

     // Función asíncrona para obetner datos
    async function getData() {

        try {
            const res = await fetch(DATAAPI);
            const data = await res.json();
            console.log(`Data received: ${JSON.stringify(data, null, 2)}`);

            if (data.length > 0) {
                dataAvailable = true; 
                createFirstGraph(data);
                createSecondGraph(data);
            }

        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    // Función asíncrona para cargar datos desde el servidor
    async function loadData() { 

        try {
            let response = await fetch(DATAAPI + "/loadInitialData", {
                method: "GET",
            });

            let status = await response.status;
            console.log(`Status code: ${status}`);

            if (status === 200) {
                await getData();
            } 

        } catch (e) {
            console.error(e);
        }
    }   

    // Función que acumula cumulative_initial_pre_financing por años
    function aggregateDataByYear(data) {

        const aggregatedData = {};

        data.forEach(item => {
            if (aggregatedData[item.year]) {
                // Si el año ya está en el diccionario, sumar datos
                aggregatedData[item.year] += parseFloat(item.cumulative_initial_pre_financing);
            } else {
                // Si el año no está, inicializar con el primer dato encontrado
                aggregatedData[item.year] = parseFloat(item.cumulative_initial_pre_financing);
            }

        });

        // Convertir el objeto a un formato adecuado para Highcharts
        return Object.keys(aggregatedData).map(year => ({
            name: year,
            y: aggregatedData[year]
        }));

    }

    // Crear un gráfico de pastel utilizando Highcharts
    function createFirstGraph(data) {

        // Procesar los datos para el gráfico de pastel
        const processedData = aggregateDataByYear(data);

        const pieChart = Highcharts.chart('pastel-container', {
            chart: {
                type: 'pie',
                height: 420, 
                width: 1580   
            },
            title: {
                text: '"Prefinanciación inicial acumulada" por año'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return this.point.name;  // Mostrar solo el año en las etiquetas de datos
                        }
                    }
                }
            },
            series: [{
                name: 'Prefinanciación inicial acumulada',
                data: processedData
            }]
        });
    }

    // Crear un gráfico de puntos utilizando Highcharts
    function createSecondGraph(data) {

        const scatterChart = Highcharts.chart('scatter-container', {
            chart: {
                type: 'scatter', // Cambiamos el tipo de gráfico a scatter (puntos)
                zoomType: 'xy'
            },
            title: {
                text: '"Pagos Interinos Acumulados" por País'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Países', 
                },
                categories: data.map(item => item.ms_name), 
                startOnTick: true,
                endOnTick: true,
                showLastLabel: true
            },
            yAxis: {
                title: {
                    text: 'Pagos Interinos Acumulados',
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 70,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1
            },
            plotOptions: {
                scatter: { 
                    marker: {
                        radius: 5,
                        symbol: 'circle' 
                    },
                    tooltip: {
                        headerFormat: '<b>{point.name}</b><br>', 
                        pointFormat: '<b>Pagos Interinos Acumulados:</b> {point.y}<br><b>Año:</b> {point.year}<br><b>Región:</b> {point.region}<br><b>CCI:</b> {point.cci}' // Contenido del tooltip
                    }
                }
            },
            series: [{
                name: 'Pagos Interinos Acumulados',
                color: 'rgba(223, 83, 255, .5)',
                data: data.map(item => ({
                    name: item.ms_name, 
                    y: parseInt(item.cumulative_interim_payments),
                    year: item.year, 
                    region: item.category_of_region, 
                    cci: item.cci 
                }))
            }]
        });
    }


    onMount(() => {
        getData();
    });

</script>


<style>

    #pastel-container,
    #scatter-container {
        width: 100%;
        height: 410px;
        margin-bottom: 20px; 
    }

    e {
        font-family: '';
        font-size: 40px;
        color: #ff864a;
        text-shadow: 2px 2px 4px rgba(254, 0, 0, 0.5);
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
    }

    /* Estilo botón de cargar datos */
    .initial {
        background-color: #ba3da7;
        color: white;
        border: none;
        padding: 2vh 3vw;
        border-radius: 5px;
        cursor: pointer;
        font-size: 30px; 
        margin-left: auto;
        margin-right: auto;
        display: block; 
        margin-top: 20px;
    }

    .initial:hover {
        background-color: #d64fb7;
    }

</style>

{#if dataAvailable==false}
    <e>No hay datos disponibles. Por favor, introduzca los datos.</e>
    <button class="initial" on:click={loadData}>Cargar datos de prueba</button>
{/if}

<div id="pastel-container"></div>
<br>
<div id="scatter-container"></div>