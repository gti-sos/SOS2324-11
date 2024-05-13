<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
    <script src="https://code.highcharts.com/modules/pyramid.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>


</svelte:head>

<script>
    import {onMount} from "svelte";
    

    onMount(()=>{
        getData();
    });

    let dataAvailable = false;
    let DATAAPI = "https://sos2324-11.appspot.com/api/v2/socioeconomics-traker-using-unconventional-data";

    async function getData(){
        try{
            const res = await fetch(DATAAPI);
            const data = await res.json();
            console.log(`Data received:${JSON.stringify(data, null, 2)}`);
            
            if (data.length > 0) {
                dataAvailable = true; 
                createBubbleGraph(data);
                createAreaGraph(data);
                createChartGraph(data);
                
                
            }
        }catch(error){
            console.log(`Error fetching data: ${error}`);
        }
    } 

    function toneDocCountByCountry(data) {

        const aggregateData = {};

        // Sumar la prefinanciación inicial acumulada por año
        data.forEach(item => {
            if (aggregateData[item.country]) {
                // Si el año ya está en el diccionario, sumar datos
                aggregateData[item.country] += parseFloat(item.tone_doc_count);
            } else {
                // Si el año no está, inicializar con el primer dato encontrado
                aggregateData[item.country] = parseFloat(item.tone_doc_count);
            }

        });

        // Convertir el objeto a un formato adecuado para Highcharts
        return Object.keys(aggregateData).map(country => ({
            name: country,
            value: aggregateData[country]
        }));

}

function toneCumByYear(data) {
        const aggregateData = {};
        const listData = [];

        // Sumar la prefinanciación inicial acumulada por año
        data.forEach(item => {
            if (aggregateData[item.year]) {
            aggregateData[item.year] += parseFloat(item.tone_cum);
            } else {
            aggregateData[item.year] = parseFloat(item.tone_cum);
            }
        });

        // Añadir los valores del diccionario a la lista
        Object.values(aggregateData).forEach(value => listData.push(value));

        return listData; // Retornar la lista de valores
}


    function createBubbleGraph(data){

        console.log(data);
        const aggregateData = toneDocCountByCountry(data);
        console.log(aggregateData);

        const gr = Highcharts.chart('container-bubble',  {
                        chart: {
                            type: 'packedbubble',
                            height: '70%'
                        },
                        title: {
                            text: 'Recuento de cantidad de documentos por Pais',
                            align: 'left'
                        },
                        tooltip: {
                            useHTML: true,
                            pointFormat: '<b>{point.name}:</b> {point.value} <sub></sub>'
                        },
                        plotOptions: {
                            packedbubble: {
                                minSize: '30%',
                                maxSize: '120%',
                                zMin: 0,
                                zMax: 10000,
                                layoutAlgorithm: {
                                    splitSeries: false,
                                    gravitationalConstant: 0.02
                                },
                                dataLabels: {
                                    enabled: true,
                                    format: '{point.name}',
                                    filter: {
                                        property: 'y',
                                        operator: '>',
                                        value: 0
                                    },
                                    style: {
                                        color: 'black',
                                        textOutline: 'none',
                                        fontWeight: 'normal'
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Europe',
                            data: aggregateData
                        }]
                    });

    }

    function createAreaGraph(data){

        // Filtrar los datos para obtener solo los relacionados con el año y el tono promedio
        const filteredData = data.map(item => ({
            date: new Date(item.year, item.month - 1, item.day), // Crear una fecha con los datos de año, mes y día
            toneAvg: item.tone_avg // Tonos promedio
        }));

        // Ordenar los datos por fecha ascendente
        filteredData.sort((a, b) => a.date - b.date);

        // Extraer fechas y tonos promedio en listas separadas
        const dates = filteredData.map(item => item.date.toLocaleDateString()); // Formatear fechas como cadenas
        const toneAvgs = filteredData.map(item => item.toneAvg);

        // Crear la gráfica de área con los datos procesados
        const gr = Highcharts.chart('container-area', {
            chart: {
                type: 'area'
            },
            title: {
                text: 'Representación de Datos en un Gráfico de Área'
            },
            xAxis: {
                categories: dates, // Fechas en el eje X
                title: {
                    text: 'Fechas'
                }
            },
            yAxis: {
                title: {
                    text: 'Valor '
                }
            },
            series: [{
                name: 'Tone Average',
                data: toneAvgs // Tonos promedio en el eje Y
            }]
        });
    }


    function createChartGraph(data){
        var mapeo = data.map(d => ({
                        y:d.tone_doc_count,
                        label: d.amd1code +","+ d.year
                    }))
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title:{
                text: "Cantidad de documento por pais-año"
            },
            axisY: {
                title: ""
            },
            data: [{        
                type: "column",  
                showInLegend: true, 
                legendMarkerColor: "grey",
                legendText: "Cantidad de documentos",
                dataPoints:       
                    mapeo
                
            }]
        });
        chart.render();
    }

</script>

<style>
    #container-bubble,
    #container-area,
    #chartContainer {
        border-left: 20px;
        border-right: 20px;
        margin-bottom: 20px; /* Añadí este estilo para agregar un margen inferior */
    }
</style>

<div id="container-bubble"></div>
<br>
<div id="container-area"></div>
<br>
<div id="chartContainer"></div>

    
