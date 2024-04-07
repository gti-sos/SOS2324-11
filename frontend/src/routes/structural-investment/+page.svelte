<script>

    import {onMount} from "svelte";
    import {dev} from "$app/environment";
    import Mensaje from "../Mensaje.svelte";

    let API = "/api/v2/structural-investment-data";
    if(dev)
        API = "http://localhost:10000" + API;

	let showFilter = false;
    let currentPage = 1; //offset
    let itemsPerPage = 10; // limit
    let errorMsg="";
    let msg="";
    let selectedFilter = {
            ms: "",
            ms_name: "",
            cci: "",
            title: "",
            fund: "",
            category_of_region: "",
            year: "",
            net_planned_eu_amount: "",
            cumulative_initial_pre_financing: "",
            cumulative_additional_initial_pre_financing: "",
            recovery_of_initial_pre_financing: "",
            cumulative_annual_pre_financing: "",
            pre_financing_covered_by_expenditure: "",
            recovery_of_annual_pre_financing: "",
            net_pre_financing: "",
            cumulative_interim_payments: "",
            recovery_of_expenses: "",
            net_interim_payments: "",
            total_net_payments: "",
            eu_payment_rate: "",
            eu_payment_rate_on_planned_eu_amount: ""
    };

    let data = [];
    let newData = {
        "ms": "IT",
        "ms_name": "Italy",
        "cci": "2014IT16RFOP017",
        "title": "Toscana - ERDF",
        "fund": "ERDF ",
        "category_of_region": "More developed ",
        "year": "2023",
        "net_planned_eu_amount": 389513945,
        "cumulative_initial_pre_financing": 11173608.57,
        "cumulative_additional_initial_pre_financing": 0,
        "recovery_of_initial_pre_financing": 0,
        "cumulative_annual_pre_financing": 72720941.21,
        "pre_financing_covered_by_expenditure": 26381261.74,
        "recovery_of_annual_pre_financing": 34963288.36,
        "net_pre_financing": 22549999.68,
        "cumulative_interim_payments": 340582683.58,
        "recovery_of_expenses": 0,
        "net_interim_payments": 366963945.32,
        "total_net_payments": 389513945,
        "eu_payment_rate": 100,
        "eu_payment_rate_on_planned_eu_amount": 100
    };

    onMount(()=>{
        getData();
    })


    async function loadData() {

        try {
            let response = await fetch(API + "/loadInitialData", {
                method: "GET",
            });

            let status = await response.status;
            console.log(`Status code: ${status}`);

            if (status === 200) {
                await getData();
                msg = "Datos cargados correctamente.";
            } else {
                errorMsg = "Los datos de pruebas ya están cargados, no se pueden volver a cargar.";
            }

        } catch (e) {
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
        }
    }
   

    async function getData(){

        try{
            let response = await fetch(API, {
                                method: "GET"
                        });

            let investment = await response.json();
            data = investment;
            console.table(data);

        }catch(e){
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
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

            let status =  await response.status;
            console.log(`Creation response status ${status}`);

            if( status === 201) {
                getData();
                msg = "El nuevo dato se ha creado exitosamente.";
            } else if(status === 400) {
                errorMsg = "Solicitud incorrecta. Por favor, verifica los datos enviados.";
            } else if(status === 409){
                errorMsg = `Lo sentimos, pero ya existe el dato con el cci ${newData.cci}. Por favor, intenta con un nombre diferente.`;
            } else {
                errorMsg = "Error interno del servidor. Por favor, intenta de nuevo más tarde.";
            }

        } catch(e) {
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
        }

    }


    async function deleteAllData(){

        console.log(`Deleting all`);
        try{
            let response = await fetch(API, {
                                method: "DELETE"
                        });

            if(response.status === 200){
                getData();
                msg = "Se han borrado correctamente todos los datos."; 
            } else if(response.status === 404) {
                errorMsg = "Recursos no encontrados. Por favor, inserte datos para borrarlos, ya que no hay datos existentes.";
            }else{ 
                errorMsg = "Error interno del servidor. Por favor, intenta de nuevo más tarde.";
            }

        }catch(e){
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
        }

    }

    async function deleteDataByCci(cci) {

        console.log(`Deleting ${cci}`);
        try {
            let response = await fetch(API + "/" + cci, {
                method: "DELETE"
            });

            if (response.status === 200) {
                getData(); 
                msg = "Dato borrado correctamente.";
            } else if(response.status === 404) {
                errorMsg = "Recurso no encontrado. Por favor, verifica la URL.";
            } else {
                errorMsg = "Error interno del servidor. Por favor, intenta de nuevo más tarde.";
            }

        } catch (e) {
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
        }

    }

    //Paginación
    function paginate(array, page_size, page_number) {
        const startIndex = (page_number - 1) * page_size;
        const endIndex = startIndex + page_size;
        return array.slice(startIndex, endIndex);
    }

    function nextPage() {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        currentPage = currentPage === totalPages ? currentPage : currentPage + 1;
    }

    function previousPage() {
        currentPage = currentPage === 1 ? 1 : currentPage - 1;
    }


    //Filtro
    async function searchParam() {
    try {
        // Verificar si no se han seleccionado filtros
        if (Object.values(selectedFilter).every(value => value === '')) {
            errorMsg = 'Debes seleccionar al menos un filtro para realizar la búsqueda.';
            return;
        }

        // Construye la URL de búsqueda a partir de los filtros proporcionados
        let searchParams = new URLSearchParams();
        
        // Filtros seleccionados
        if (selectedFilter.length == 0) {
            selectedFilter = {
                ms: '',
                ms_name: '',
                cci: '',
                title: '',
                fund: '',
                category_of_region: '',
                year: '',
                net_planned_eu_amount: '',
                cumulative_initial_pre_financing: '',
                cumulative_additional_initial_pre_financing: '',
                recovery_of_initial_pre_financing: '',
                cumulative_annual_pre_financing: '',
                pre_financing_covered_by_expenditure: '',
                recovery_of_annual_pre_financing: '',
                net_pre_financing: '',
                cumulative_interim_payments: '',
                recovery_of_expenses: '',
                net_interim_payments: '',
                total_net_payments: '',
                eu_payment_rate: '',
                eu_payment_rate_on_planned_eu_amount: ''
            };
        }
        
        // Agregar filtros seleccionados a los parámetros de búsqueda
        for (const key in selectedFilter) {
            if (selectedFilter[key] !== '') {
                searchParams.append(key, selectedFilter[key]);
            }
        }

        // Construir el rango de años si se proporcionan 'from' y 'to'
        if (selectedFilter.from && selectedFilter.to) {
            searchParams.append('from', selectedFilter.from);
            searchParams.append('to', selectedFilter.to);
        }

        // Construir la URL de búsqueda
        let searchUrl = `${API}?${searchParams.toString()}`;
        console.log(searchUrl);

        // Realiza la petición GET a la API con la URL de búsqueda generada
        let response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Manejo de la respuesta de la API
        let status = response.status;
        console.log(`Response status: ${status}`);

        if (response.status === 200) {
            // Actualiza los datos después de una búsqueda exitosa
            let datosAct   = await response.json();
            data  = datosAct ;
            console.log(data );
            msg = 'Ya se ha realizado el filtro indicado.';
        } else {
            if (response.status === 400) {
                errorMsg = 'Error en la estructura de los datos.';
            } else if (response.status === 409) {
                errorMsg = 'Ya existe una entrada con esos datos.';
            } else if (response.status === 404) {
                errorMsg = 'Dato no encontrado.';
            }
        }
    } catch (e) {
        errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
        console.error(e);
    }

}


    async function cleanFilter(){

        try{
            let response = await fetch(API, {
                                method: "GET"
                        });

            let investment = await response.json();
            data = investment;
            console.table(data);
            
            if(response.status === 200){
                msg = 'Se han eliminado los filtros.';
            }else{
                errorMsg = "Ya se han borrado los filtros.";
            }

        }catch(e){
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
        }

    }

    
</script>   

<br> <br>
{#if msg!=""}
<div>
    <Mensaje class="exito" tipo="exito" mensaje={msg} />
</div>

{/if}
{#if errorMsg!=""}
    <div>
        <Mensaje tipo="error" mensaje={errorMsg} />
    </div>
{/if}


<br><br>
    <button class="initial" on:click={loadData}>Cargar datos de prueba</button>  
    <button class="filtro" on:click={() => {showFilter = true;}}>Filtros</button>
    <button class="filtro2" on:click={cleanFilter}>Eliminar filtros</button>
    
<br><br><br>


{#if showFilter}
    <div class="modal">
        <div class="modal-content">
            <button class="close" on:click={() => { showFilter = false; }}>&times;</button>
            <t style="margin-left: 400px; ;">Aplicar el filtro deseado</t>
            <form on:submit|preventDefault={searchParam}>
                <label>
                    Ciclas país 
                    <input type="text" bind:value={selectedFilter.ms} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Nombre del país
                    <input type="text" bind:value={selectedFilter.ms_name} style="margin-bottom: 10px;" />
                </label>
                <label>
                    CCI (campo identificador)
                    <input type="text"  bind:value={selectedFilter.cci} style="margin-bottom: 10px; " />
                </label>
                <label>
                    Título 
                    <input type="text"  bind:value={selectedFilter.title} style="margin-bottom: 10px; " />
                </label>
                <label>
                    Tipo de fondo 
                    <input type="text" bind:value={selectedFilter.fund} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Categoría de la región 
                    <input type="text" bind:value={selectedFilter.category_of_region} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Año 
                    <input type="number" bind:value={selectedFilter.year}  />
                </label>
                <label>
                    Cota inferior de año
                    <input type="number" bind:value={selectedFilter.from} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Cota superior de año
                    <input type="number" bind:value={selectedFilter.to} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Cantidad neta planificada de la UE 
                    <input type="number" bind:value={selectedFilter.net_planned_eu_amount} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Pre-financiamiento inicial acumulado 
                    <input type="number" bind:value={selectedFilter.cumulative_initial_pre_financing} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Pre-financiamiento anual acumulado 
                    <input type="number" bind:value={selectedFilter.cumulative_annual_pre_financing} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Pagos interinos acumulados 
                    <input type="number" bind:value={selectedFilter.cumulative_interim_payments} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Pagos netos totales 
                    <input type="number" bind:value={selectedFilter.total_net_payments} style="margin-bottom: 10px;" />
                </label>
                <label>
                    Tasa de pago de la UE 
                    <input type="number" bind:value={selectedFilter.eu_payment_rate} style="margin-bottom: 10px;" />
                </label>
                <button type="submit" class="filtro" style="color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin-left: 500px;">Filtrar</button>
            </form>
        </div>
    </div>
{/if}



<t> Datos sobre la inversión estrututal </t>
<br><br><br>

{#if data && data.length > 0}
<div class="card-container">
    {#each paginate(data, itemsPerPage, currentPage) as item}
        <div class="card">
            <h3>{item.title}</h3>
            <p><strong>País:</strong> {item.ms_name} ({item.ms})</p>
            <p><strong>Código identificador:</strong> {item.cci}</p>
            <p><strong>Fondo:</strong> {item.fund}</p>
            <p><strong>Categoría de la región:</strong> {item.category_of_region}</p>
            <p><strong>Año:</strong> {item.year}</p>
            <p><strong>Cantidad neta planificada de la UE:</strong> {item.net_planned_eu_amount}</p>
            <p><strong>Financiación previa inicial acumulativa:</strong> {item.cumulative_initial_pre_financing}</p>
            <p><strong>Financiación previa adicional inicial acumulativa:</strong> {item.cumulative_additional_initial_pre_financing}</p>
            <p><strong>Recuperación de la financiación previa inicial:</strong> {item.recovery_of_initial_pre_financing}</p>
            <p><strong>Financiación previa anual acumulativa:</strong> {item.cumulative_annual_pre_financing}</p>
            <p><strong>Financiación previa cubierta por gastos:</strong> {item.pre_financing_covered_by_expenditure}</p>
            <p><strong>Recuperación de la financiación previa anual:</strong> {item.recovery_of_annual_pre_financing}</p>
            <p><strong>Financiación previa neta:</strong> {item.net_pre_financing}</p>
            <p><strong>Pago interino acumulativo:</strong> {item.cumulative_interim_payments}</p>
            <p><strong>Recuperación de gastos:</strong> {item.recovery_of_expenses}</p>
            <p><strong>Pagos intermedios netos:</strong> {item.net_interim_payments}</p>
            <p><strong>Total de pagos netos:</strong> {item.total_net_payments}</p>
            <p><strong>Tasa de pago de la UE:</strong> {item.eu_payment_rate}</p>
            <p><strong>Tasa de pago de la UE sobre la cantidad planificada de la UE:</strong> {item.eu_payment_rate_on_planned_eu_amount}</p>
            
            <button class="button" onclick="window.location.href='/structural-investment/' + '{item.cci}'">Detalles</button>
            <button class="button" on:click="{deleteDataByCci(item.cci)}">Borrar</button>

        </div>
    {/each}
</div>
{:else}
    <p class="inicio">No hay datos disponibles</p>
{/if}

<div class="pagination">
    <button on:click={previousPage} disabled={currentPage === 1}>Anterior página</button>
    <button on:click={nextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>Siguiente página</button>
</div>

<br><br><br><br><br>
<t> Creación de nuevos datos </t>
<br>

<br> 
<table class="tabla-datos">

    <thead>
        <tr>
            <th>Código país</th>
            <th>Nombre país</th>
            <th>Código identificador</th>
            <th>Título</th>
            <th>Nombre del fondo</th>
            <th>Categoría de la región</th>
            <th>Año</th>
        </tr>
        <tr>
            <td><input bind:value={newData.ms}></td>
            <td><input bind:value={newData.ms_name}></td>
            <td><input bind:value={newData.cci}></td>
            <td><input bind:value={newData.title}></td>
            <td><input bind:value={newData.fund}></td>
            <td><input bind:value={newData.category_of_region}></td>
            <td><input bind:value={newData.year}></td>
        </tr>
        <tr>
            <th>Cantidad neta planificada de la UE</th>
            <th>Financiación previa inicial acumulativa</th>
            <th>Financiación previa inicial adicional acumulativa</th>
            <th>Recuperación de la financiación previa inicial</th>
            <th>Financiación previa anual acumulativa</th>
            <th>Financiación previa cubierta por gastos</th>
            <th>Recuperación de la financiación previa anual</th>
        </tr> 
        <tr>
            <td><input bind:value={newData.cumulative_additional_initial_pre_financing}></td>
            <td><input bind:value={newData.recovery_of_initial_pre_financing}></td>
            <td><input bind:value={newData.cumulative_annual_pre_financing}></td>
            <td><input bind:value={newData.pre_financing_covered_by_expenditure}></td>
            <td><input bind:value={newData.recovery_of_annual_pre_financing}></td>
            <td><input bind:value={newData.net_pre_financing}></td>
            <td><input bind:value={newData.cumulative_interim_payments}></td>
         
        </tr>
        <tr>
            <th>Financiación previa neta</th>
            <th>Pago interino acumulativo</th>
            <th>Recuperación de gasto</th>
            <th>Pagos intermedios netos</th>
            <th>Total de pagos netos</th>
            <th>Tasa de pago de la UE</th>
            <th>Tasa de pago de la UE sobre la cantidad planificada de la UE</th>
        </tr>
        <tr>
            <td><input bind:value={newData.total_net_payments}></td>
            <td><input  bind:value={newData.eu_payment_rate}></td>
            <td><input bind:value={newData.eu_payment_rate_on_planned_eu_amount}></td>
            <td><input bind:value={newData.recovery_of_expenses}></td>
            <td><input bind:value={newData.net_interim_payments}></td>
            <td><input  bind:value={newData.net_planned_eu_amount}></td>
            <td><input bind:value={newData.cumulative_initial_pre_financing}></td>
        </tr>
    </thead>

</table>


<br>
<div class="final">
    <button class="final" on:click="{createData}">Crear nuevo dato</button>
    <button on:click="{deleteAllData}">Eliminar todos los datos</button>
</div>



<style>

    t {
        font-family: ''; 
        font-size: 40px; 
        color: #0e2ac8; 
        text-shadow: 2px 2px 4px rgba(111, 54, 191, 0.5); 
        text-align: center; 
        margin-top: 50px; 
        margin-bottom: 30px;
        margin-left: 800px;
    }

    .inicio {
    font-weight: bold;
    font-size: 50px;
    text-align: center;
    margin-right: 200px;
    margin-bottom: 200px;
    }


    .filtro {
        background-color: #641b85; 
        color: white;
        border: none;
        padding: 20px 35px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 630px;
        font-size: 38px; 
    }

    .filtro:hover {
        background-color: #ab58de; 
    }

    .filtro2 {
        background-color: #641b85; 
        color: white;
        border: none;
        padding: 20px 35px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 1860px;
        margin-top: 30px;
        font-size: 38px; 
    }

    .filtro2:hover {
        background-color: #ab58de; 
    }

    .initial {
        background-color: #ba3da7; 
        color: white;
        border: none;
        padding: 20px 35px;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 830px;
        font-size: 38px; 
    }

    .initial:hover {
        background-color: #d64fb7; 
    }

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

    /* Estilo para los botones cartas */
    .button {
    background-color: #007BFF; 
    color: white; 
    border: none; 
    padding: 10px 20px; 
    text-align: center; 
    text-decoration: none; 
    display: inline-block; 
    font-size: 20px; 
    margin: 5px 0px; 
    cursor: pointer; 
    border-radius: 4px; 
    margin-left: 20%;
    }

    .button:hover {
        background-color: #2267b1; 
    }

    /* Estilos para los botones de la creacion */
    .final button {
        background-color: #ADD8E6; 
        color: rgb(0, 0, 0);
        border: none;
        padding: 10px 25px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: -550px;
        margin-left: 650px;
        font-size: 38px; 
    }

    .final button:hover {
        background-color: #4682B4; 
    }

    /* Estilos de las cartas */
    .card-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .card {

        width: 23%; 
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 10px;
        background-color: #f0f8ff; 
        box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); 
        margin-left: 10px;
    }

    /* Estilos de la paginación */
    .pagination {
        margin-top: 20px;
        margin-left: 720px;
    }

    /* Estilos para los botones de la paginación */
    .pagination button {
        background-color: #4394b0; 
        color: white;
        border: none;
        padding: 20px 35px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 30px;
        font-size: 38px; 
    }

    .pagination button:hover {
        background-color: #0c103c; 
    }

    /*Fomrulario*/
	.modal {
		display: block; 
		position: fixed;
		z-index: 1;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4); 
	}

	.modal-content {
        font-weight: bold;
		background-color: #fefefe; 
		margin: 15% auto; 
		padding: 20px;
		border: 1px solid #888;
		width: 50%;
		border-radius: 5px;
		box-shadow:
			0 4px 8px 0 rgba(0, 0, 0, 0.2),
			0 6px 20px 0 rgba(0, 0, 0, 0.19);
        margin: 10% auto;
        padding: 10px; 
	}

	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: rgb(134, 86, 218);
		text-decoration: none;
		cursor: pointer;
	}

	input[type='text'],
	input[type='number'] {
		width: 100%;
		padding: 12px 20px;
		margin: 8px 0;
		box-sizing: border-box;
		border: 1px solid #ccc;
		border-radius: 4px;
		resize: vertical;
	}

	input[type='text']:focus,
	input[type='number']:focus {
		border: 3px solid #555;
        margin: 4px 0;
        width: 100%;
	}
  

</style>
