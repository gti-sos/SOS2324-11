<svelte:head>
    
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

</svelte:head>

<script>

    import { onMount } from "svelte";
    let dataAvailable = false;

    let DATAAPI = "http://localhost:10000/api/v2/structural-investment-data";

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


    function aggregateDataByYear(data) {

        const aggregatedData = {};

        // Sumar la prefinanciación inicial acumulada por año
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
                name: 'Cumulative Initial Pre Financing',
                data: processedData
            }]
        });
    }

    // Crear un gráfico de dispersión utilizando Highcharts
    function createSecondGraph(data) {

        const scatterChart = Highcharts.chart('dispersion-container', {
            chart: {
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Relación entre "Fondos planificados" y "Pagos netos" por país'
            },
            xAxis: {
            title: {
                enabled: true,
                text: 'Fondos Planificados',
                style: {
                    color: '#FF6347'  
                }
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: 'Pagos Netos',
                style: {
                    color: '#4682B4'  
                }
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
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '<span style="color:{series.color}">{point.name}</span>: <b style="color:#FF6347">{point.x}</b> Fondos Planificados, <b style="color:#4682B4">{point.y}</b> Pagos Netos'
                    }
                }
            },
            series: [{
                name: 'Países',
                color: 'rgba(223, 83, 255, .5)',
                data: data.map(item => ({
                    name: item.ms_name,
                    x: parseInt(item.net_planned_eu_amount),
                    y: parseInt(item.total_net_payments)
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
    #dispersion-container {
        width: 100%;
        height: 400px;
        margin-bottom: 20px; /* Añadí este estilo para agregar un margen inferior */
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
<div id="dispersion-container"></div>