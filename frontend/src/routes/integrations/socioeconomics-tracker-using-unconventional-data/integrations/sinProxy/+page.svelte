<svelte:head>
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/socioeconomics-traker-using-unconventional-data';
    //const apiUrl2 = 'https://real-time-finance-data.p.rapidapi.com/company-income-statement';
    let datosCombinados = null;

    onMount(async () => {
        await combinedData(); // Asegúrate de esperar que se completen los datos
        createGraph(); // Luego, crea el gráfico
    });

    async function fetchDataUrl1() {
        const response = await fetch(apiUrl1);
        return response.json(); // Retorna el resultado directamente
    }

    async function fetchDataUrl2() {
        const params = new URLSearchParams({
            symbol: 'AAPL:NASDAQ',
            period: 'ANNUAL',
            language: 'en'
        });
        const fullUrl = `${apiUrl2}?${params.toString()}`;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '01bdbb50d8mshb0788f51cbd3fccp155beejsnce3fed91f95e',
                'X-RapidAPI-Host': 'real-time-finance-data.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(fullUrl, options);
            const data = await response.json();
            return data.data?.income_statement || []; // Maneja un posible `undefined`
        } catch (error) {
            console.error('Error fetching api data:', error);
            return []; // En caso de error, retorna un array vacío
        }
    }

    async function combinedData() {
        const data1 = await fetchDataUrl1();
        const data2 = await fetchDataUrl2();

        if (!Array.isArray(data1) || !Array.isArray(data2)) {
            console.error('Datos incorrectos. No son arrays.');
            datosCombinados = []; // Asegúrate de inicializar a un array vacío
            return;
        }

        const datoAgregado = popularidadPorAño(data1);

        const combinedData = {};

        const yearsData1 = new Set(Object.keys(datoAgregado).map(Number));
        const yearsData2 = new Set(data2.map(d => d.year));

        const commonYears = Array.from(yearsData1).filter(year => yearsData2.has(year));

        commonYears.forEach(year => {
            const dataUrl1 = datoAgregado[year];
            const dataUrl2 = data2.find(d => d.year === year);

            if (dataUrl1 && dataUrl2) {
                if (!combinedData[year]) {
                    combinedData[year] = {
                        year,
                        popularity_rate: 0,
                        net_profit_margin: 0,
                    };
                }
                combinedData[year].popularity_rate = dataUrl1;
                combinedData[year].net_profit_margin = dataUrl2.net_profit_margin || 0;
            }
        });

        datosCombinados = Object.values(combinedData); // Asegúrate de asignar valores válidos
    }

    function popularidadPorAño(data) {
        
        const yearTotals = {};

        data.forEach((d) => {
            const year = d.year;
            const popularityRate = d.popularity_rate || 0.0; 

            if (!yearTotals[year]) {
                yearTotals[year] = { total: 0.0, count: 0 };
            }

            yearTotals[year].total += popularityRate;
            yearTotals[year].count += 1;
        });

    
        const yearAverages = {};

        
        Object.keys(yearTotals).forEach((year) => {
            const total = yearTotals[year].total;
            const count = yearTotals[year].count;
            yearAverages[year] = count > 0 ? total / count : 0; 
        });

        return yearAverages;
    }

    function createGraph() {
        if (!Array.isArray(datosCombinados) || datosCombinados.length === 0) {
            console.error('No hay datos combinados disponibles para el gráfico.');
            return;
        }

        const mapeoPopularityRate = datosCombinados.map(entry => entry.popularity_rate);
        const mapeoNetProfitMargin = datosCombinados.map(entry => entry.net_profit_margin);

        const chartConfig = {
            type: 'vbar',
            globals: {
                fontFamily: 'Lato',
            },
            plot: {
                tooltip: {
                visible: false,
                },
                'bars-space-left': 0.15,
                'bars-space-right': 0.15,
            },
            plotarea: {
                margin: 'dynamic',
            },
            scaleX: {
                values: datosCombinados.map(entry => entry.year), // Asegúrate de obtener los años correctos
            },
            series: [
                {
                    text: 'Popularity Rate',
                    values: mapeoPopularityRate,
                },
                {
                    text: 'Net Profit Margin',
                    values: mapeoNetProfitMargin,
                },
            ],
            crosshairX: {
                lineWidth: '100%',
                alpha: 0.4,
            },
        };

        zingchart.render({
            id: 'myChart',
            data: chartConfig,
            height: '560px',
            width: '100%',
        });
    }
</script>

<div id="myChart"></div>


    
