<script>

    import {onMount} from "svelte";
    import {dev} from "$app/environment";
    import Mensaje from "../Mensaje.svelte";

    
    let API = "/api/v2/structural-investment-data";
    if(dev)
        API = "http://localhost:10000" + API;
    

    // let API = "https://sos2324-11.appspot.com/api/v2/structural-investment-data";
    
    
    //let API  = "http://localhost:10000/proxySharay"

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


    onMount(async () => {
    await getData();
    });

    // Función asíncrona para cargar datos desde el servidor
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

    // Función asíncrona para obtener datos de inversión desde el servidor
    async function getData() {

        try {
            let response = await fetch(API, {
                method: "GET" 
            });

            let investment = await response.json();
            data = investment;
            console.table(data);

        } catch (e) {
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e); 
        }
    }


    // Función asíncrona para crear nuevos datos de inversión en el servidor
    async function createData() {

        try {

            let response = await fetch(API, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json" // Encabezado especificando el tipo de contenido como JSON
                },
                body: JSON.stringify(newData, null, 2) // Cuerpo de la solicitud, convierte el objeto newData a JSON
            });

            let status = await response.status; 
            console.log(`Creation response status ${status}`); 

            if (status === 201) {
                getData();
                msg = "El nuevo dato se ha creado exitosamente."; 
            } else if (status === 400) {
                errorMsg = "Solicitud incorrecta. Por favor, verifica los datos enviados.";
            } else if (status === 409) {
                errorMsg = `Lo sentimos, pero ya existe el dato con el cci ${newData.cci}. Por favor, intenta con un nombre diferente.`;
            } else {
                errorMsg = "Error interno del servidor. Por favor, intenta de nuevo más tarde.";
            }

        } catch (e) {
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
            console.error(e);
        }

    }


    // Función asíncrona para eliminar todos los datos de inversión desde el servidor
    async function deleteAllData() {
        
        console.log(`Deleting all`);

        try {
            
            let response = await fetch(API, {
                method: "DELETE"
            });

            if (response.status === 200) {
                getData();
                msg = "Se han borrado correctamente todos los datos.";
            } else if (response.status === 404) {
                errorMsg = "Recursos no encontrados. Por favor, inserte datos para borrarlos, ya que no hay datos existentes.";
            } else { 
                errorMsg = "Error interno del servidor. Por favor, intenta de nuevo más tarde.";
            }

        } catch (e) {
            console.error(e);
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
        }
    }


    // Función asíncrona para eliminar un dato de inversión por su código CCI
    async function deleteDataByCci(cci) {

        console.log(`Deleting ${cci}`);

        try {
        
            let response = await fetch(API + "/" + cci, {
                method: "DELETE"
            });

            if (response.status === 200) {           
                getData(); 
                msg = "Dato borrado correctamente.";
            } else if (response.status === 404) {
                errorMsg = "Recurso no encontrado. Por favor, verifica la URL.";
            }else {               
                errorMsg = "Error interno del servidor. Por favor, intenta de nuevo más tarde.";
            }

        } catch (e) { 
            console.error(e);
            errorMsg = "Error interno del servidor, compruebe el error por consola para más información.";
        }
    }


    // Función para paginar una matriz de datos
    function paginate(array, page_size, page_number) {
        // Calcula el índice de inicio de los elementos en la página actual
        const startIndex = (page_number - 1) * page_size;
        // Calcula el índice de fin de los elementos en la página actual
        const endIndex = startIndex + page_size;
        // Devuelve una porción de la matriz original que contiene los elementos de la página actual
        return array.slice(startIndex, endIndex);
    }

    // Función para avanzar a la siguiente página
    function nextPage() {   
        // Calcula el número total de páginas
        const totalPages = Math.ceil(data.length / itemsPerPage);
        // Incrementa el número de página actual si no estamos en la última página
        currentPage = currentPage === totalPages ? currentPage : currentPage + 1;
    }

    // Función para retroceder a la página anterior
    function previousPage() {
        // Decrementa el número de página actual si no estamos en la primera página
        currentPage = currentPage === 1 ? 1 : currentPage - 1;
    }


    // Función asíncrona para realizar una búsqueda de datos en la API basada en los filtros proporcionados
    async function searchParam() {

        try {
            // Construye la URL de búsqueda a partir de los filtros proporcionados
            let searchParams = new URLSearchParams();
            
            // Filtros seleccionados
            if (selectedFilter.length == 0) {
                // Si no se han seleccionado filtros, se reinician los valores
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

            let response = await fetch(searchUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let status = response.status;
            console.log(`Response status: ${status}`);

            if (response.status === 200) {
                let datosAct = await response.json();
                data = datosAct;
                console.log(data);
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

    // Función asíncrona para limpiar todos los filtros y realizar una nueva búsqueda sin filtros aplicados
    async function cleanFilter() {

        // Reinicia todos los valores de los filtros
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
            eu_payment_rate_on_planned_eu_amount: '',
            from: '',
            to: ''
        };

        // Realiza una nueva búsqueda sin aplicar ningún filtro
        msg = 'Al no introducir ningún filtro, se mostrarán todos los datos.';
        setTimeout(async () => {
            await searchParam();
        }, 5000); // Espera 5 segundos antes de realizar la búsqueda sin filtros
    }


</script>   

<br>
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
    <button class="filtro" on:click={() => {showFilter = true;}}>Filtros</button> <br>
    <button class="filtro2" on:click={cleanFilter}>Limpiar  filtros</button>
    
<br><br><br>


{#if showFilter}
    <div class="modal">
        <div class="modal-content">
            <button class="close" on:click={() => { showFilter = false; }}>&times;</button>
            <t >Aplicar el filtro deseado</t>
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
                    <input type="number" bind:value={selectedFilter.year} />
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
                <button type="submit" class="filt" >Filtrar</button>
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
            <t>{item.title}</t>
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
            
            <button class="button-left" onclick="window.location.href='/structural-investment/' + '{item.cci}'">Detalles</button>
            <button class="button-right" on:click="{deleteDataByCci(item.cci)}">Borrar</button>

        </div>
    {/each}
</div>
{:else}
    <e class="inicio">No hay datos disponibles</e>
{/if}

<div class="pagination">
    <!-- Si se pulsa va a la anteiror página y si estas en la primera página se deshabilitarse -->
    <button on:click={previousPage} disabled={currentPage === 1}>Anterior página</button>
    <!-- Si se pulsa va a la siguiente página  y si estas en la última página se deshabilitarse-->
    <button on:click={nextPage} disabled={currentPage === Math.ceil(data.length / itemsPerPage)}>Siguiente página</button>
</div>

<br><br><br>
<t> Creación de nuevos datos </t>
<br>

<br> 
<div class="tabla-container">
    <table class="tabla-datos">

        <thead>
            <tr>
                <th>Código país</th>
                <th>Nombre país</th>
                <th>Código identificador</th>
                <th>Título</th>
            </tr>
            <tr>
                <td><input bind:value={newData.ms}></td>
                <td><input bind:value={newData.ms_name}></td>
                <td><input bind:value={newData.cci}></td>
                <td><input bind:value={newData.title}></td>
            </tr>
            <tr>
                <th>Nombre del fondo</th>
                <th>Categoría de la región</th>
                <th>Año</th>
                <th>Cantidad neta planificada de la UE</th>
            </tr>
            <tr>
                <td><input bind:value={newData.fund}></td>
                <td><input bind:value={newData.category_of_region}></td>
                <td><input bind:value={newData.year}></td>
                <td><input bind:value={newData.cumulative_additional_initial_pre_financing}></td>
            </tr>
            <tr>
                <th>Financiación previa inicial acumulativa</th>
                <th>Financiación previa inicial adicional acumulativa</th>
                <th>Recuperación de la financiación previa inicial</th>
                <th>Financiación previa anual acumulativa</th>
            </tr>
            <tr>
                <td><input bind:value={newData.recovery_of_initial_pre_financing}></td>
                <td><input bind:value={newData.cumulative_annual_pre_financing}></td>
                <td><input bind:value={newData.pre_financing_covered_by_expenditure}></td>
                <td><input bind:value={newData.recovery_of_annual_pre_financing}></td>
            </tr>
            <tr>
                <th>Financiación previa cubierta por gastos</th>
                <th>Recuperación de la financiación previa anual</th>
                <th>Financiación previa neta</th>
                <th>Pago interino acumulativo</th>
            </tr>
            <tr>
                <td><input bind:value={newData.net_pre_financing}></td>
                <td><input bind:value={newData.cumulative_interim_payments}></td>
                <td><input bind:value={newData.total_net_payments}></td>
                <td><input bind:value={newData.eu_payment_rate}></td>
            </tr>
            <tr>
                <th>Recuperación de gasto</th>
                <th>Pagos intermedios netos</th>
                <th>Total de pagos netos</th>
                <th>Tasa de pago de la UE</th>
            </tr>
            <tr>
                <td><input bind:value={newData.eu_payment_rate_on_planned_eu_amount}></td>
                <td><input bind:value={newData.recovery_of_expenses}></td>
                <td><input bind:value={newData.net_interim_payments}></td>
                <td><input bind:value={newData.net_planned_eu_amount}></td>
            </tr>
            <tr>
                <th>Tasa de pago de la UE sobre la cantidad planificada de la UE</th>
                <td colspan="4" style="background-color: #f0f0f0;"></td>
            </tr>
            <tr>
                <td><input bind:value={newData.cumulative_initial_pre_financing}></td>
                <td colspan="4" style="background-color: #f0f0f0;"></td>
            </tr>
        </thead>
        
        

    </table>
</div>


<br>
<div class="final">
    <button on:click="{createData}">Crear nuevo dato</button>
    <button on:click="{deleteAllData}">Eliminar todos los datos</button>
</div>




<style>

    /* Estilo de etxtos */
    t {
        font-family: '';
        font-size: 40px;
        color: #0e2ac8;
        text-shadow: 2px 2px 4px rgba(111, 54, 191, 0.5);
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
    }

    e {
        font-family: '';
        font-size: 40px;
        color: #ff864a;
        text-shadow: 2px 2px 4px rgba(254, 0, 0, 0.5);
        text-align: center;
        display: flex;
        align-items: center; 
        justify-content: center; 
    }

     /* Estilo botón de filtros */
    .filtro {
        background-color: #641b85; 
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 25px; 
        padding: 2vh 3vw; 
        margin-left: 20px;
        margin-right: auto;
    }

    .filtro:hover {
        background-color: #ab58de; 
    }

    /* Estilo botón de eliminar filtro */
    .filtro2 {
        background-color: #641b85; 
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 25px; 
        padding: 2vh 3vw;
        margin-left: 20px;
        margin-right: auto; 
        margin-top: 20px;
    }

    .filtro2:hover {
        background-color: #ab58de; 
    }

    .filt {
        background-color: #976faa; 
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 25px; 
        padding: 2vh 3vw;
        margin-left: 300px;
        margin-right: auto; 
        margin-top: 20px;
    }

    .filt:hover {
        background-color: #591d7e; 
    }

     /* Estilo botón de cargar datos */
    .initial {
        background-color: #ba3da7;
        color: white;
        border: none;
        padding: 2vh 3vw;
        border-radius: 5px;
        cursor: pointer;
        font-size: 30px; 
        margin-left: auto;
        margin-right: auto;
        display: block; 
    }

    .initial:hover {
        background-color: #d64fb7;
    }


    /* Estilo para la tabla */
    .tabla-container {
        overflow-x: auto; 
        margin: 10px auto; 
        width: 90%; 
    }

    .tabla-datos {
        border: 2px solid #000;
        background-color: #ADD8E6;
        border-collapse: collapse;
        width: 100%; 
    }

    .tabla-datos th, 
    .tabla-datos td {
        border: 1px solid #000;
        padding: 20px;
        text-align: center;
    }

    .tabla-datos th {
        background-color: #4682B4;
        color: white;
        text-align: center;
    }

    /* Estilo para los botones cartas */
    .button-left {
        background-color:rgba(111, 54, 191, 0.5);
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 90px;
    }

    .button-right {
        background-color: rgba(111, 54, 191, 0.5);
        color: white;
        border: none;
        padding: 10px 20px;
        text-align: center;
        text-decoration: none;
        font-size: 20px;
        cursor: pointer;
        border-radius: 4px;
        margin-left: 40px;
    }

    .button-left:hover,
    .button-right:hover {
        background-color: #5225ad;
    }

    /* Estilos para los botones de la creacion */
    .final {
        display: flex;
        justify-content: center; 
    }

    .final button {
        background-color: #ADD8E6; 
        color: rgb(0, 0, 0);
        border: none;
        padding: 15px 25px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 30px;
        font-size: 30px; 
    }

    .final button:hover {
        background-color: #4682B4; 
    }

    /* Estilos de las cartas */
    .card-container {
        display: flex;
        flex-wrap: wrap;
        display: flex;
        justify-content: center;
    }

    .card {
        width: 30%; 
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
            text-align: center; 
        }

    /* Estilos para los botones de la paginación */
    .pagination button {
        background-color: #4394b0; 
        color: white;
        border: none;
        padding: 15px 25px;
        border-radius: 5px;
        cursor: pointer;
        margin-right: 30px;
        font-size: 30px; 
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

    /*Fomrulario botón*/
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

    /*Fomrulario celdas de datos*/
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
