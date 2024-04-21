<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/highcharts-more.js"></script>
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
                createPyramidGraph(data);
                
                
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

        const aggregateData = toneDocCountByCountry(data);
        console.log(aggregateData)

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

    function createPyramidGraph(data){

                    const listData = toneCumByYear(data);

                    const gr = Highcharts.chart('container-pyramid', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'Representación de Datos en un Gráfico de Área'
                },
                xAxis: {
                    categories: ['25-09-2022', '26-09-2022', '27-09-2022', '28-09-2022', '29-09-2022', '30-09-2022'],
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
                    data: [-1.262, null, -0.224, 1.128, 0.766, 2.844]
                }]
            });
    }

</script>

<style>
    #container-bubble,
    #container-pyramid {
        width: 100%;
        margin-bottom: 20px; /* Añadí este estilo para agregar un margen inferior */
    }
</style>
<div id="container-bubble"></div>
<br>
<div id="container-pyramid"></div>
    
