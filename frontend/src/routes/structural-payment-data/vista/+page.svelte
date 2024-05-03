<svelte:head>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.css">
</svelte:head>

<script>
    import {onMount} from "svelte";

    onMount(()=>{
        getData();
    });

    let dataAvailable = false;
    let DATAAPI = "https://sos2324-11.appspot.com/api/v2/structural-payment-data";

    async function getData(){
        try{
            const res = await fetch(DATAAPI);
            const data = await res.json();
            console.log(`Data received:${JSON.stringify(data, null, 2)}`);
            
            if (data.length > 0) {
                dataAvailable = true; 
                createGraph(data);
                createGraph2(data);
                createGraph3(data);
            }
        }catch(error){
            console.log(`Error fetching data: ${error}`);
        }
    }   

    function createGraph(data){
        const gr = Highcharts.chart('container-bar', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Pagos intermedios netos a cada país por año',
                    align: 'left'
                },
                xAxis: {
                    title: {
                        text: null
                    },
                    gridLineWidth: 1,
                    lineWidth: 0
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Pago',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    },
                    gridLineWidth: 0
                },
                plotOptions: {
                    bar: {
                        borderRadius: '50%',
                        dataLabels: {
                            enabled: true
                        },
                        groupPadding: 0.1
                    }
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "Pago intermedio neto",
                    data: data.map(item => ({
                    name: item.ms_name,
                    x: parseInt(item.year),
                    y: parseInt(item.net_interim_payment)
                }))
                }]
        });



    }

    function createGraph2(data){
        const gh = Highcharts.chart('container-column', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Prefinanciación anual para cada pais'
                },
                xAxis: {
                    type: 'category',
                    labels: {
                        autoRotation: [-45, -90],
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Prefinanciación '
                    }
                },
                legend: {
                    enabled: false
                },
                series: [{
                    name: 'Prefinanciación',
                    colors: [
                        '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                        '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                        '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                        '#03c69b',  '#00f194'
                    ],
                    colorByPoint: true,
                    groupPadding: 0,
                    data: data.map(item => ({
                                name: item.ms_name,
                                y: parseInt(item.net_annual_pre_financing)
                            })),
                    dataLabels: {
                        enabled: true,
                        rotation: -90,
                        color: '#FFFFFF',
                        inside: true,
                        verticalAlign: 'top',
                        format: '{point.y:.1f}', // one decimal
                        y: 10, // 10 pixels down from the top
                        style: {
                            fontSize: '13px',
                            fontFamily: 'Verdana, sans-serif'
                        }
                    }
                }]
        });
    }
    
    function createGraph3(data){
        var options = {
                    labelInterpolationFnc: function(value) {
                        return value[0]
                    }};

        var responsiveOptions = [
                        
                    ['screen and (min-width: 640px)', {
                        chartPadding: 30,
                        labelOffset: 100,
                        labelDirection: 'explode',
                        labelInterpolationFnc: function(value) {
                        return value;
                        }
                    }],
                    ['screen and (min-width: 1024px)', {
                        labelOffset: 80,
                        chartPadding: 20
                    }]
                    ];

        new Chartist.Pie('.ct-chart', {
            labels: data.map(item => item.ms_name),
            series: data.map(item => parseInt(item.eu_payment_rate))
        }, options, responsiveOptions);
                    
    }


    
    
</script>


<style>
    .ct-chart{
        width: 100%;
        height: 350px;
        margin-bottom: 20px; 

    }
   
    #container-column,
    #container-bar {
        width: 100%;
        height: 400px;
        margin-bottom: 20px; 

    }

    h3 {
            text-align: center;
        }
</style>
<div id="container-column"></div>
<br>
<div id="container-bar"></div>
<br>
<h3>Tasa de pago anual UE</h3>
<div class="ct-chart"></div>
