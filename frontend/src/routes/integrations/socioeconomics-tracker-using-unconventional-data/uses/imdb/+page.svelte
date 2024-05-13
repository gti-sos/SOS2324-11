<svelte:head>
    <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</svelte:head>

<script>
    import { onMount } from 'svelte';

    let ArrayFilms = [];

    onMount(async () => {
    await getFilms();
    });

    async function getFilms(){
        const url = 'https://imdb188.p.rapidapi.com/api/v1/getWeekTop10';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '01bdbb50d8mshb0788f51cbd3fccp155beejsnce3fed91f95e',
                'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                    const filmsData = await response.json();
                    console.log(filmsData); // Asegúrate que tenga una propiedad 'data'
                    if (Array.isArray(filmsData.data)) {
                        ArrayFilms = filmsData.data;
                        console.log(ArrayFilms)
                    } else {
                    console.error("Expected data to be an array, but it's not.");
                    }
            } else {
                console.error(`HTTP Error: ${response.status}`);
            }
        } catch (error) {
        console.error('Error fetching Films data:', error);
        }
    }
</script>

{#if ArrayFilms.length > 0}
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Year</th>
                <th>Description</th>
                <th>Rating</th>
            </tr>
        </thead>
        <tbody>
            {#each ArrayFilms as film}
                <tr>
                    <td>{film.titleText?.text ?? "Unknown"}</td>
                    <td>{film.releaseDate?.year ?? "Unknown"}</td>
                    <td>{film.plot?.plotText?.plainText ?? "No description available"}</td>
                    <td>{film.ratingsSummary?.aggregateRating ?? "Not rated"}</td>
                </tr>
            {/each}
        </tbody>
    </table>
{:else}
    <p>Loading films...</p>
{/if}

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    th {
        background-color: #f2f2f2;
        text-align: left;
    }
    tr:nth-child(even) {
        background-color: #f9f9f9;
    }
    tr:hover {
        background-color: #ddd;
    }
</style>


