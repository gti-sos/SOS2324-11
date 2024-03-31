<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import {page} from '$app/stores';

    
    onMount(async () => {
        getData();
    });

    let cci = $page.params.cci;

    let API = "/api/v2/structural-investment-data";

    if (dev) {
        API = "http://localhost:10000" + API;
    }

    let dato = [];
    let result = "";
    let resultStatus = "";


    async function getData() {

        resultStatus = result = "";
        const res = await fetch(API + "/" + cci, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            updateMs = dato.ms;
            updateMsName = dato.ms_name;
            updateCCI = dato.cci;
            updateTitle = dato.title;
            updateFund = dato.fund;
            updateCategory_of_region = dato.category_of_region;
            updateYear = dato.year;
            updateNet_planned_eu_amount = dato.net_planned_eu_amount;
            updateCumulative_initial_pre_financing = dato.cumulative_initial_pre_financing;
            updateVumulative_additional_initial_pre_financing = dato.cumulative_additional_initial_pre_financing;
            updateRecovery_of_initial_pre_financing = dato.recovery_of_initial_pre_financing;
            updateCumulative_annual_pre_financing = dato.cumulative_annual_pre_financing;
            updatePre_financing_covered_by_expenditure = dato.pre_financing_covered_by_expenditure;
            updateRecovery_of_annual_pre_financing = dato.recovery_of_annual_pre_financing; 
            updateNet_pre_financing = dato.net_pre_financing;
            updateCumulative_interim_payments = dato.cumulative_interim_payments;
            updateRecovery_of_expenses = dato.recovery_of_expenses;
            updateNet_interim_payments = dato.net_interim_payments;
            updateTotal_net_payments = dato.total_net_payments;
            updateEu_payment_rate = dato.eu_payment_rate;
            updateEu_payment_rate_on_planned_eu_amount = dato.eu_payment_rate_on_planned_eu_amount;

        } catch (e) {
            console.log(`Error parsing result: ${e}`);
            document.getElementById('message-container').textContent = "Error al parserar los datos.";
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 404) {
            document.getElementById('message-container').textContent = `El elemento: ${cci} , no ha sido encontrado.`;
        }
        if (status == 500) {
            document.getElementById('message-container').textContent = "Error ineterno del servidor.";
        }
    }
   
    let updateMs = "";
    let updateMsName = "";
    let updateCCI = cci; 
    let updateTitle = "";
    let updateFund = "";
    let updateCategory_of_region = "";
    let updateYear = "";
    let updateNet_planned_eu_amount = "";
    let updateCumulative_initial_pre_financing = "";
    let updateVumulative_additional_initial_pre_financing = ""; 
    let updateRecovery_of_initial_pre_financing = "";
    let updateCumulative_annual_pre_financing = "";
    let updatePre_financing_covered_by_expenditure = "";
    let updateRecovery_of_annual_pre_financing = ""; 
    let updateNet_pre_financing = "";
    let updateCumulative_interim_payments = "";
    let updateRecovery_of_expenses = ""; 
    let updateNet_interim_payments = "";
    let updateTotal_net_payments = "";
    let updateEu_payment_rate = "";
    let updateEu_payment_rate_on_planned_eu_amount = "";

    async function updateData() {
            
        resultStatus = result = "";
        const requestBody = {
            ms: updateMs,
            ms_name: updateMsName,
            cci: updateCCI,
            title: updateTitle,
            fund: updateFund,
            category_of_region: updateCategory_of_region,
            year: updateYear,
            net_planned_eu_amount: updateNet_planned_eu_amount,
            cumulative_initial_pre_financing: updateCumulative_initial_pre_financing,
            cumulative_additional_initial_pre_financing: updateVumulative_additional_initial_pre_financing,
            recovery_of_initial_pre_financing: updateRecovery_of_initial_pre_financing,
            cumulative_annual_pre_financing: updateCumulative_annual_pre_financing,
            pre_financing_covered_by_expenditure: updatePre_financing_covered_by_expenditure,
            recovery_of_annual_pre_financing: updateRecovery_of_annual_pre_financing,
            net_pre_financing: updateNet_pre_financing,
            cumulative_interim_payments: updateCumulative_interim_payments,
            recovery_of_expenses: updateRecovery_of_expenses,
            net_interim_payments: updateNet_interim_payments,
            total_net_payments: updateTotal_net_payments,
            eu_payment_rate: updateEu_payment_rate,
            eu_payment_rate_on_planned_eu_amount: updateEu_payment_rate_on_planned_eu_amount
        };

        // Verificar si alguno de los campos está vacío o undefined
        for (const key in requestBody) {
            if (requestBody[key] === undefined || requestBody[key] === "") {
                document.getElementById('message-container').textContent = "Rellene todos los campos.";
                return; 
            }
        }

        const res = await fetch(API + "/" + cci, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        const status = await res.status;
        resultStatus = status;

            if (status == 200) {
                document.getElementById('message-container').textContent = "El elemento ha sido actualizado.";
                getData();
            } else if (status == 400) {
                document.getElementById('message-container').textContent = "Rellene todos los campos.";
            } else if (status == 500) {
                document.getElementById('message-container').textContent = "Error interno del servidor.";
            }
    }


</script>

<body>
    
    <br> <br>
    <div id="message-container"></div>

    <br> 
    <h2>Detalles sobre el dato con {cci} </h2> 
    
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
                <td><input bind:value={updateMs}></td>
                <td><input bind:value={updateMsName}></td>
                <td>{updateCCI}</td>
                <td><input bind:value={updateTitle}></td>
                <td><input bind:value={updateFund}></td>
                <td><input bind:value={updateCategory_of_region}></td>
                <td><input bind:value={updateYear}></td>
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
                <td><input bind:value={updateNet_planned_eu_amount }></td>
                <td><input bind:value={updateCumulative_initial_pre_financing }></td>
                <td><input bind:value={updateVumulative_additional_initial_pre_financing }></td>
                <td><input bind:value={updateRecovery_of_initial_pre_financing }></td>
                <td><input bind:value={updateCumulative_annual_pre_financing }></td>
                <td><input bind:value={updatePre_financing_covered_by_expenditure }></td>
                <td><input bind:value={updateRecovery_of_annual_pre_financing }></td>
             
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
                <td><input bind:value={updateNet_pre_financing }></td>
                <td><input  bind:value={updateCumulative_interim_payments }></td>
                <td><input bind:value={updateRecovery_of_expenses }></td>
                <td><input bind:value={updateNet_interim_payments }></td>
                <td><input bind:value={updateTotal_net_payments }></td>
                <td><input  bind:value={updateEu_payment_rate }></td>
                <td><input bind:value={updateEu_payment_rate_on_planned_eu_amount }></td>
            </tr>
        </thead>
    
    </table>
    
    <button class="button" on:click="{updateData}">Actualizar dato</button>
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
        font-size: 20px; 
        margin: 4px 2px; 
        cursor: pointer; 
        border-radius: 4px; 
        margin-top: 10px;
        margin-left: 10px;
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
