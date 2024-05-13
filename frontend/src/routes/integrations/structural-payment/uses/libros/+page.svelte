<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.css">
</svelte:head>
<script>
    
    import { onMount } from "svelte";

    let booksData = [];

    onMount(async () => {
        await getData();
    });
    
    async function getData() {
        const url = 'https://book-info-hub.p.rapidapi.com/search.php?query=atomic';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'adeede387emsh91b03dc6a809ef8p11c7f5jsn012824a94b45',
                'X-RapidAPI-Host': 'book-info-hub.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const booksData = await response.json();
            console.log(booksData);

            if (booksData.length > 0) {
                createGraph(booksData);
                
            }
        } catch (error) {
            console.error(error);
        }
        
           
    }

    function createGraph(booksData){
        new Chartist.Bar('.ct-chart', {
            labels: booksData.map(book=>book.title),
            series: booksData.map(book=>parseFloat(book.rating))
            }, {
            distributeSeries: true
            });
    }

</script>



<style>
    .ct-chart{
        width: 100%;
        height: 360px;
        margin-bottom: 20px; 

    }

    e {
        font-family: '';
        font-size: 60px;
        color: #290ef5;
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
        margin-bottom: 20px;
        }
</style>

<br>
<e>Valoraciones a libros</e>
<div class="ct-chart"></div>