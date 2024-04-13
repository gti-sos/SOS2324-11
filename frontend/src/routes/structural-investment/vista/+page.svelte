<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
</svelte:head>

<script>
    import { onMount } from "svelte";

    let DATAAPI = "https://sos2324-11.appspot.com/api/v2/structural-investment-data";

    async function getData() {
        try {
            const res = await fetch(DATAAPI);
            const data = await res.json();
            console.log(`Data received: ${JSON.stringify(data, null, 2)}`);
            createFirstGraph(data);
            createSecondGraph(data);
        } catch (error) {
            console.log(`Error fetching data: ${error}`);
        }
    }

    function aggregateDataByYear(data) {
    const aggregatedData = {};

    // Sumar la prefinanciación inicial acumulada por año
    data.forEach(item => {
        if (aggregatedData[item.year]) {
            // Si el año ya está en el diccionario, sumar los montos
            aggregatedData[item.year] += parseFloat(item.cumulative_initial_pre_financing);
        } else {
            // Si el año no está, inicializar con el primer monto encontrado
            aggregatedData[item.year] = parseFloat(item.cumulative_initial_pre_financing);
        }
    });

    // Convertir el objeto a un formato adecuado para Highcharts
    return Object.keys(aggregatedData).map(year => ({
        name: year,
        y: aggregatedData[year]
    }));
    }

    function createFirstGraph(data) {
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
                    color: '#FF6347'  // Cambio de color a un tono de rojo para los Fondos Planificados
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
                    color: '#4682B4'  // Cambio de color a un tono de azul para los Pagos Netos
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
    }
</style>


<div id="pastel-container"></div>
<br>
<div id="dispersion-container"></div>
