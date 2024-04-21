<script>
    import {onMount} from "svelte";
    import {dev} from "$app/environment";
    

    let API = "/api/v2/socioeconomics-traker-using-unconventional-data";
    if(dev)
        API = "http://localhost:10000"+API;

    let data = [];
    let newData = {
        "date": "Fecha",
        "year": 0,
        "month": "Mes",
        "day": 0,
        "tone_doc_count": "Cantidad",
        "popularity_rate": "Cantidad",
        "tone_avg": "Cantidad",
        "tone_w_avg": "Cantidad",
        "tone_cum": "Cantidad",
        "amd1code": "Cantidad",
        "country": "Pais",
        "area": "Siglas",
        "ref_time": "Cantidad",
        "topic": "Cantidad",
        
    };

    let from = "";
    let to = "";
    let date = "";
    let year = "";
    let month = "";
    let day = "";
    let tone_doc_count = "";
    let popularity_rate = "";
    let tone_avg = "";
    let tone_w_avg = "";
    let tone_cum = "";
    let amd1code = "";
    let country = "";
    let area = "";
    let ref_time = "";
    let topic = "";
    
    let Msg ="";
    let limit = 10;
    let currentPage = 0;

    onMount(()=>{
        filterApplied = false;
        mostrarTabla = false;
        getData();
    })

    let filterApplied = false;
    let mostrarTabla = false;
    async function getData(){
        try{
            let response = await fetch(API+`?offset=0&&limit=${limit}`, {
                                method: "GET"
                        });

            let dat = await response.json();
            data = dat;
            console.log(data);
        }catch(e){
            Msg = e;
        }
    }

    async function getDataFilter() {
        try {
            let response;
            let parametros = `?limit=${limit}`;
            if (currentPage > 0) {
                const offset = currentPage * limit;
                parametros += `&offset=${offset}`;
            }
    
            // Verificamos si se han introducido parámetros de búsqueda
            if (date !== "") {
                parametros += `&date=${date}`;
            }
            if (year !== "") {
                parametros += `&year=${year}`;
            }
            if (month !== "") {
                parametros += `&month=${month}`;
            }
            if (day !== "") {
                parametros += `&day=${day}`;
            }
            if (tone_doc_count !== "") {
                parametros += `&tone_doc_count=${tone_doc_count}`;
            }
            if (popularity_rate !== "") {
                parametros += `&popularity_rate=${popularity_rate}`;
            }
            if (tone_avg !== "") {
                parametros += `&tone_avg=${tone_avg}`;
            }
            if (tone_w_avg !== "") {
                parametros += `&tone_w_avg=${tone_w_avg}`;
            }
            if (tone_cum !== "") {
                parametros += `&tone_cum=${tone_cum}`;
            }
            if (amd1code !== "") {
                parametros += `&amd1code=${amd1code}`;
            }
            if (country !== "") {
                parametros += `&country=${country}`;
            }
            if (area !== "") {
                parametros += `&area=${area}`;
            }
            if (ref_time !== "") {
                parametros += `&ref_time=${ref_time}`;
            }
            if (topic !== "") {
                parametros += `&topic=${topic}`;
            }
            console.log(parametros);
    
            response = await fetch(API + parametros, {
                method: "GET",
            });
    
            if (response.status === 404) {
                Msg = "No se encontraron datos que coincidan con los filtros especificados.";
                datas = []; 
                return;
            }
    
            let datas = await response.json();

            if (from !== "" && to !== "") {
                datas = datas.filter(d => d.year >= from && d.year <= to);
            }

            data = datas;
            console.log(datas);

            if (
                date !== "" ||
                year !== "" ||
                month !== "" ||
                day !== "" ||
                tone_doc_count !== "" ||
                popularity_rate !== "" ||
                tone_avg !== "" ||
                tone_w_avg !== "" ||
                tone_cum !== "" ||
                amd1code !== "" ||
                country !== "" ||
                area !== "" ||
                ref_time !== "" ||
                topic !== "" ||
                from !== "" ||
                to !== "") {
                filterApplied = true;
            } else {
                filterApplied = false;
            }


    
            // Verificar si la respuesta contiene datos después de aplicar los filtros
            if (datas.length === 0 && filterApplied) {
                // Mostrar mensaje de éxito
                Msg = "No se encuentran datos con esos campos";
            }else if(datas.length > 0 && filterApplied){
                Msg = "La busqueda se ha realizado correctamente"
            }
        } catch (e) {
            Msg = e;
        }
    }

    async function getInitialData() {
        let response = await fetch(API+"/loadInitialData", {
                                        method: "GET",
        });
        try {
            const dat = await res.json();
            data = dat;
        } catch (error) {
            console.log(`Error al parsear el resultado: ${error}`);
        }
        let status = await response.status;
        if(status==200){
            if(data.length>0){
                Msg = "La lista de datos tiene elementos"
            }
            else{
                getDataFilter();
                Msg = "Los datos han sido insertados correctamente.";
            }
            
        }
    }

    let getFrom = null;
    let getTo = null;

    async function getFromTo(getFrom, getTo, currentPage) {
        try {
            let parametros = `?from=${getFrom}&to=${getTo}`;
            
            // Calcular el offset para la paginación
            //const offset = currentPage * limit;
            parametros += `?offset=0&&limit=${limit}`;
            
            const response = await fetch(API + parametros, {
                method: "GET",
            });

            if (response.status === 200) {
                const datas = await response.json();
                console.log(datas);
                data = datas;

                if (data.length === 0) {
                    Msg = "No se encontraron datos que coincidan con los filtros especificados.";
                } else {
                    Msg = "Se ha realizado la búsqueda correctamente.";
                }
            } else if (response.status === 404) {
                Msg = "No se encontraron datos que coincidan con los filtros especificados.";
            } else {
                Msg = "Error al obtener datos. Código de estado: " + response.status;
            }
        } catch (error) {
            Msg = "Error al obtener datos: " + error;
        }
    }


    async function createData(){
        try{
            let response = await fetch(API, {
                                method: "POST",
                                headers:{
                                    "Content-Type":"application/json"
                                },
                                body:JSON.stringify(newData,null,2)
                        });

            let status = await response.status;
            console.log(`Creation response status ${status}`);
            if(response.status==201){
                getDataFilter();
                Msg = "El dato se ha creado correctamente";
            } else if (response.status == 409) {
                Msg = "El dato ya existe";
            }else if(response.status==400){
                Msg = "El dato no tiene los campos esperados";
            } else if (response.status == 500) {
                Msg = "Error interno";
            }else{
                Msg = "Error, código: " + response.status;
            }
        
        }catch(e){
            Msg = e;
        }
    }

    async function deleteAllData(){
        try{
            let response = await fetch(API, {
                                method: "DELETE"
                        });
            if(response.status==200){
                getData();
                Msg = "Se han eliminado todos los datos correctamente";
            } else if (response.status == 404) {
                Msg = "No se ha encontrado";
            } else if (response.status == 500) {
                Msg = "Error interno";
            }else{
                Msg = "Error, código: " + response.status;
            }
        
        }catch(e){
            Msg = e;
        }
    }

    async function deleteData(country,year,day){
        console.log(`Deleting data with country: ${country}, year: ${parseInt(year)} and day: ${parseInt(day)}`)
        try{
            let response = await fetch(API+"/"+country+"/"+parseInt(year)+"/"+parseInt(day),{
                                method: "DELETE"
                        });
            
            if(response.status==200){
                getData();
                Msg = "Dato eliminado correctamente";
            } else if (response.status == 404) {
                Msg = `No se ha encontrado el país ${country} con año ${parseInt(year)} y dia ${parseInt(day)}`;
            } else if (response.status == 500) {
                Msg = "Error interno";
            }else{
                Msg = "Error, código: " + response.status;
            }
        
        }catch(e){
            Msg = e;
        }
    }

    function toggleTabla() {
        mostrarTabla = !mostrarTabla;
    }

    function limpiarCampos() {
         date = "";
         year = "";
         month = "";
         day = "";
         tone_doc_count = "";
         popularity_rate = "";
         tone_avg = "";
         tone_w_avg = "";
         tone_cum = "";
         amd1code = "";
         country = "";
         area = "";
         ref_time = "";
         topic = "";
         from = "";
         to = "";
        getDataFilter();
    }

    function limpiarCamposFromTo() {
         getFrom = "";
         getTo = "";
        getDataFilter() ;
    }

    async function nextPage() {
        if (data.length >= limit) {
          currentPage++;
          await getDataFilter();
        } else {
          Msg = "No hay más datos disponibles en la página siguiente.";
          setTimeout(() => {
            Msg = "";
          }, 5000);
        }
      }

      async function prevPage() {
        if (currentPage > 0) {
          currentPage--;
          await getDataFilter();
        } else {
          Msg = "Ya estás en la primera página.";
          setTimeout(() => {
            Msg = "";
          }, 5000);
        }
      }

</script>

<body>

    <br> <br>
    <div id="message-container">
        {#if Msg != ""}
        {Msg}
        {/if}
    </div>

    <br>
    <br>
    
    <table class="tabla-datos">
        <thead>
            <th>Fecha</th>
            <th>Año</th>
            <th>Mes</th>
            <th> Dia</th>
            <th>Recuento de cantidad de documentos </th>
            <th>Tasa de popularidad</th>
            <th>Cantidad media</th>
        </thead>

        <tbody>
            <tr>
                <td>
                    <input bind:value={newData.date}>
                </td>
                <td>
                    <input bind:value={newData.year} type="number"> 
                </td>
                <td>
                    <input bind:value={newData.month}> 
                </td>
                <td>
                    <input bind:value={newData.day} type="number"> 
                </td>
                <td>
                    <input bind:value={newData.tone_doc_count}> 
                </td>
                <td>
                    <input bind:value={newData.popularity_rate}> 
                </td>
                <td>
                    <input bind:value={newData.tone_avg}> 
                </td>
            </tr>
        </tbody>

        <thead>
            <th>Cantidad con peso media</th>
            <th>tone_cum</th>
            <th>Codigo amd1</th>
            <th>Pais</th>
            <th>Area</th>
            <th>Referencia de tiempo</th>
            <th>Tema</th>
        </thead>

        <tr>
            <td>
                <input bind:value={newData.tone_w_avg}> 
            </td>
            <td>
                <input bind:value={newData.tone_cum}> 
            </td>
            <td>
                <input bind:value={newData.amd1code}> 
            </td>
            <td>
                <input bind:value={newData.country}> 
            </td>
            <td>
                <input bind:value={newData.area}> 
            </td>
            <td>
                <input bind:value={newData.ref_time}> 
            </td>
            <td>
                <input bind:value={newData.topic}> 
            </td>
        </tr>
    </table>


    <ul>
        
        {#each data as d}
            <li class = "dataItem"><a href="/socioeconomics-tracker-using-unconventional-data/{d.country}/{d.year}/{d.day}">{d.country}-{d.year}-{d.day}</a><button class="button" on:click="{deleteData(d.country, d.year, d.day)}">  Borrar</button>
            </li>
        {/each}
    </ul>

    
    <button class="button" on:click="{createData}">Crear nuevo dato</button>
    <button class="button" on:click="{getInitialData}">Cargar datos iniciales</button>
    <button class="button" on:click="{deleteAllData}">Eliminar todos los datos</button>

    <br>
    <br>
    <button class="button" on:click={toggleTabla}>Filtrar</button>

    <!-- Agrega controles de paginación -->
    <br>
    <br>

    
    
    
    <button class="button" on:click="{prevPage}">Pagina anterior</button>
    <button class="button" on:click="{nextPage}">Pagina siguiente</button>
    

    {#if mostrarTabla}
    <table class="tabla-datos">
        <thead>
            <th>Fecha</th>
            <th>Año</th>
            <th>Mes</th>
            <th> Dia</th>
            <th>Recuento de cantidad de documentos </th>
            <th>Tasa de popularidad</th>
            <th>Cantidad media</th>
        </thead>

        <tbody>
            <tr>
                <td>
                    <input bind:value={date}>
                </td>
                <td>
                    <input bind:value={year} type="number"> 
                </td>
                <td>
                    <input bind:value={month}> 
                </td>
                <td>
                    <input bind:value={day} type="number"> 
                </td>
                <td>
                    <input bind:value={tone_doc_count}> 
                </td>
                <td>
                    <input bind:value={popularity_rate}> 
                </td>
                <td>
                    <input bind:value={tone_avg}> 
                </td>
            </tr>
        </tbody>

        <thead>
            <th>Cantidad con peso media</th>
            <th>tone_cum</th>
            <th>Codigo amd1</th>
            <th>Pais</th>
            <th>Area</th>
            <th>Referencia de tiempo</th>
            <th>Tema</th>
        </thead>

        <tr>
            <td>
                <input bind:value={tone_w_avg}> 
            </td>
            <td>
                <input bind:value={tone_cum}> 
            </td>
            <td>
                <input bind:value={amd1code}> 
            </td>
            <td>
                <input bind:value={country}> 
            </td>
            <td>
                <input bind:value={area}> 
            </td>
            <td>
                <input bind:value={ref_time}> 
            </td>
            <td>
                <input bind:value={topic}> 
            </td>
        </tr>

        <thead>
            <th>Desde</th>
            <th>Hasta</th>
        </thead>
        <tr>
            <td>
                <input bind:value={from} type="number"> 
            </td>
            
            <td>
                <input bind:value={to} type="number"> 
            </td>
        </tr>
        
        <tr>
            <button class="button" on:click={getDataFilter}>Buscar</button>
            <button class="button" on:click={limpiarCampos}>Limpiar búsqueda</button>
        </tr>
    </table>
    {/if}
</body>


<style>
    /* Estilo para la tabla */
    .tabla-datos {
        border: 2px solid #000; 
        background-color: #ADD8E6; 
        border-collapse: collapse; 
        margin-left: 10px;
        margin-right: 10px;
    }

    /* Estilo para las celdas de la tabla */
    .tabla-datos th, .tabla-datos td {
        border: 1px solid #000; 
        padding: 20px; 
        text-align: center; 
        
    }

    /* Estilo para las celdas de encabezado */
    .tabla-datos th {
        background-color: #4682B4; 
        color: white; 
        text-align: center; 
        
    }

    /* Estilo para los botones */
    .button {
    background-color: #007BFF; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    text-align: center; 
    text-decoration: none; 
    display: inline-block; 
    font-size: 16px; 
    margin: 4px 2px; 
    cursor: pointer; 
    border-radius: 4px; 
    margin-left: 1%;
    }

    .button:hover {
        background-color: #0056b3; 
    }

    /* Mensaje de error*/
    #message-container {
    padding: 10px;
    font-size: 28px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 0px;
    background-color: #f8b8a3; 
    color: #000000; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
}


</style>




