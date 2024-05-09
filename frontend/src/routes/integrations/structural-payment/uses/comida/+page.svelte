<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/chartist/dist/chartist.min.css">
</svelte:head>
<script>
    
    import { onMount } from "svelte";

    let foodData = {};

    onMount(async () => {
        await getData();
    });
    
    async function getData() {
        //const url = 'https://dietagram.p.rapidapi.com/apiFood.php?name=Jab%C5%82ko&lang=pl';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'adeede387emsh91b03dc6a809ef8p11c7f5jsn012824a94b45',
                'X-RapidAPI-Host': 'dietagram.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const foodData = await response.json();
            console.log(foodData);

            if (foodData.dishes) {
                createGraph(foodData);
                
            }
        } catch (error) {
            console.error(error);
        }
    }

    function createGraph(foodData){
        var data ={
            labels: foodData.dishes.map(food=>food.name),
            series: foodData.dishes.map(food=>parseInt(food.caloric))
                };

                var options = {
                labelInterpolationFnc: function(value) {
                    return value[0]
                }
                };

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

                new Chartist.Pie('.ct-chart', data, options, responsiveOptions);
        
            }

</script>



<style>
    .ct-chart{
        width: 100%;
        height: 360px;
        margin-bottom: 20px; 

    }

    h3 {
            text-align: center;
        }
</style>

<br>
<h3>Calorias de algunas comidas</h3>
<div class="ct-chart"></div>