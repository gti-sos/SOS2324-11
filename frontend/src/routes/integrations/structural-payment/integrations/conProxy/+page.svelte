

<script>
    import { onMount } from 'svelte';
  
    const apiUrl = 'https://sos2324-11.appspot.com/api/v2/structural-payment-data';
    
    let streamingData = {};
    let countryData = [];



    onMount(async () => {
        await getData();
        await fetchData(apiUrl);
        await combinedData();
    });

  async function fetchData(url) {
    const response = await fetch(url);
    const dat = await response.json();
    console.log('Data fetched from', url, dat);
    return dat;
  }

  async function getData() {

    //const url = 'https://global-economy-news.p.rapidapi.com/?category=fiat&country=us';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'adeede387emsh91b03dc6a809ef8p11c7f5jsn012824a94b45',
            'X-RapidAPI-Host': 'global-economy-news.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const streamingData = await response.json();
        console.log(streamingData);
    } catch (error) {
        console.error(error);
    }
    }

    async function combinedData() {
    const data1 = await fetchData(apiUrl);
    const data2 = streamingData;

    const combinedData = {};

    const countryFromData1 = new Set(data1.map(c => c.ms));
    console.log("Countries from data1", countryFromData1);
    const countryFromData2 = new Set(data2.data.map(item => item.site_country));
    console.log("Countries from data2", countryFromData2);

    const commonCountry = Array.from(new Set([...countryFromData1].filter(c => countryFromData2.has(c))));
    console.log("Countries comun", commonCountry)

       // Iterar sobre los años comunes y obtener los datos correspondientes de cada URL
       commonCountry.forEach(country => {
            const dataFromUrl1 = data1.find(entry => entry.ms === country);
            const dataFromUrl2 = data2.data.find(team => team.site_country === country);
            console.log("Data from URL1 for", country, dataFromUrl1);
            console.log("Data from URL2 for", country, dataFromUrl2);

            if (dataFromUrl1 && dataFromUrl2) {
                // Ensure combinedData is an object to add properties
                if (!combinedData[country]) {
                    combinedData[country] = {
                        country: country,
                        n_3_decommitment_amount: 0,
                        rank: 0,
                    };
                }
                combinedData[country].n_3_decommitment_amount = dataFromUrl1.n_3_decommitment_amount ;
                combinedData[country].rank = dataFromUrl2.rank ;
            }
        });
  

    // Filtrar solo los años comunes con datos en ambas fuentes
    countryData = Object.values(combinedData);
    console.log("Datos combinados" , countryData);
  
}

</script>





