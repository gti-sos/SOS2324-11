<svelte:head>
    <script src="https://cdn.zingchart.com/zingchart.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';
    const apiUrl1 = 'https://sos2324-11.appspot.com/api/v2/socioeconomics-traker-using-unconventional-data';
    const apiUrl2 = 'https://sos2324-11.appspot.com/proxyAlvaro';

    onMount(async () => {
        fetchData(apiUrl1);
        fetchData(apiUrl2);
        combinedData()
    });

    async function fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        console.log('Data fetched from', url, data);
        return data;
    }

    async function combinedData() {
        const data1 = await fetchData(apiUrl1);

        const data2 = await fetchData(apiUrl2);
        //Esto es porque el data 2 devuelve dos parametros uno el status y otro el result que es el array de objetos que quiero obtener
        const data2Result = data2.result


        if (!Array.isArray(data1) || !Array.isArray(data2Result)) {
            console.error('Datos incorrectos. No son arrays.');
            datosCombinados = []; // Asegúrate de inicializar a un array vacío
            return;
        }

        const datoAgregado = toneDocCountByYear(data1);

        const combinedData = {};

        const yearsData1 = new Set(Object.keys(datoAgregado).map(Number));
        const yearsData2 = new Set(data2Result.map(d => extraerAño(d.date)));

        const commonYears = Array.from(yearsData1).filter(year => yearsData2.has(year));

        commonYears.forEach(year => {
            const dataUrl1 = datoAgregado[year];
            const dataUrl2 = data2Result.find(d => extraerAño(d.date) === year);

            if (dataUrl1 && dataUrl2) {
                if (!combinedData[year]) {
                    combinedData[year] = {
                        year,
                        tone_doc_count: 0,
                        actual: 0,
                    };
                }
                combinedData[year].popularity_rate = dataUrl1;
                combinedData[year].net_profit_margin = dataUrl2.actual || 0;
            }
        });

        datosCombinados = Object.values(combinedData); // Asegúrate de asignar valores válidos
    }

    function extraerAño(fecha) {
        // Crear un objeto Date a partir de la cadena de fecha
        const date = new Date(fecha);
        // Extraer el año de la fecha y convertirlo a entero
        const año = parseInt(date.getFullYear());
        return año;
    }

    function toneDocCountByYear(data) {
        
        const yearTotals = {};

        data.forEach((d) => {
            const year = d.year;
            const tone_doc_count = d.tone_doc_count || 0.0; 

            if (!yearTotals[year]) {
                yearTotals[year] = { total: 0.0, count: 0 };
            }

            yearTotals[year].total += tone_doc_count;
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
</script>