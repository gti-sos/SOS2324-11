<svelte:head>
    
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

    <script src="https://cdn.amcharts.com/lib/5/index.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/percent.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/map.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/themes/Animated.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/geodata/continentsLow.js"></script>
    <script src="https://cdn.amcharts.com/lib/5/geodata/worldLow.js"></script>

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
                createAmchartsGraph(data);
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

        return Object.keys(aggregatedData).map(year => ({
            x: year,
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
                            return this.point.x;  // Mostrar solo el año en las etiquetas de datos
                        }
                    }
                }
            },
            series: [{
                x: 'Prefinanciación inicial acumulada',
                data: processedData
            }]
        });
    }

    // Crear un gráfico de puntos utilizando Highcharts
    function createSecondGraph(data) {

        const scatterChart = Highcharts.chart('scatter-container', {
            chart: {
                type: 'scatter',
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

    // Crear un gráfico de mapa utilizando amcharts
    function createAmchartsGraph(data) {

        var root = am5.Root.new("chartdiv");

        // Establecer temas
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        // Crear el gráfico de mapa
        var chart = root.container.children.push(am5map.MapChart.new(root, {
            panX: "translateX",
            panY: "translateY",
            projection: am5map.geoMercator(),
        }));

        // Crear el título del gráfico
        var title = root.container.children.push(am5.Label.new(root, {
            text: '"Tasa de pago de la UE" por país',
            fontSize: 30,
            fontWeight: "bold",
            x: am5.percent(35), 
            y: am5.percent(0),
            fill: am5.color("#333"), 

  
        }));

        // Crear la serie principal de polígonos para los países
        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
            geoJSON: am5geodata_worldLow,
            exclude: ["AQ"] // Excluir la Antártida
        }));

        // Agrupar y sumar los datos por país
        const groupedData = data.reduce((acc, item) => {
            if (!acc[item.ms]) {
                acc[item.ms] = {
                    id: item.ms,
                    name: item.ms_name,
                    value: 0
                };
            }
            acc[item.ms].value += item.eu_payment_rate;
            return acc;
        }, {});

        // Convertir el objeto agrupado en un array
        const filteredData = Object.values(groupedData);

        // Asignar los valores acumulados a los polígonos
        polygonSeries.data.setAll(filteredData.map(item => ({
            id: item.id,
            name: item.name,
            value: item.value // Usar el valor acumulado para el mapa
        })));

        // Configurar tooltips para mostrar información sobre los países
        polygonSeries.mapPolygons.template.setAll({
            tooltipText: "{name}: {value}", // Mostrar el nombre del país y su valor de eu_payment_rate acumulado en el tooltip
            toggleKey: "active",
            interactive: true
        });

        // Crear estados para los polígonos al pasar el mouse y al hacer clic
        polygonSeries.mapPolygons.template.states.create("hover", {
            fill: root.interfaceColors.get("primaryButtonHover") // Cambiar el color de fondo al pasar el mouse
        });

        polygonSeries.mapPolygons.template.states.create("active", {
            fill: root.interfaceColors.get("primaryButtonHover") // Cambiar el color de fondo al hacer clic
        });

        var previousPolygon;

        // Manejar el evento de activación de un polígono
        polygonSeries.mapPolygons.template.on("active", function (active, target) {
            if (previousPolygon && previousPolygon != target) {
                previousPolygon.set("active", false); // Desactivar el polígono anterior
            }
            if (target.get("active")) {
                polygonSeries.zoomToDataItem(target.dataItem); // Enfocar el mapa en el país seleccionado
            }
            else {
                chart.goHome(); // Volver al nivel de zoom inicial si se hace clic fuera de un polígono
            }
            previousPolygon = target;
        });

        // Añadir control de zoom
        chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

        // Configurar el clic en el fondo del mapa para volver al nivel de zoom inicial
        chart.chartContainer.get("background").events.on("click", function () {
            chart.goHome();
        });

        // Hacer que las cosas se animen al cargar
        chart.appear(1000, 100);
    }



    onMount(async () => {
        await getData();
    });

</script>


{#if dataAvailable==false}
    <e>No hay datos disponibles. Por favor, introduzca los datos.</e>
    <button class="initial" on:click={loadData}>Cargar datos de prueba</button>
{/if}

<div id="pastel-container"></div>
<br>
<div id="scatter-container"></div>
<br>
<div id="chartdiv"></div>

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

    #chartdiv {
        width: 100%;
        height: 410px;
        margin-bottom: 20px; 
    }


</style>