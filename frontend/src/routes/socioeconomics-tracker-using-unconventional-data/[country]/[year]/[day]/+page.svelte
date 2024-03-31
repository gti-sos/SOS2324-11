<script>
    import { onMount } from "svelte";
    import { dev } from "$app/environment";
    import { page } from '$app/stores';

    onMount(async () => {
        getData();
    });

    let country = $page.params.country;
    let year = $page.params.year;
    let day = $page.params.day;

    let API = "/api/v2/socioeconomics-traker-using-unconventional-data";

    if (dev) {
        API = "http://localhost:10000"+API;
    }

    let dato = [];
    let result = "";
    let resultStatus = "";
    let message = "";

    async function getData() {
        resultStatus = result = "";
        const res = await fetch(API + "/" + ms_name + "/" + fund, {
            method: "GET",
        });
        try {
            const data = await res.json();
            result = JSON.stringify(data, null, 2);
            dato = data;
            updatedMs = dato.ms;
            updatedMs_name = dato.ms_name;
            updatedFund = dato.fund;
            updatedYear = dato.year;
            updatedPlanned_eu_amount = dato.planned_eu_amount;
            updatedN_3_decommitment_amount = dato.n_3_decommitment_amount;
            updatedNet_planned_eu_amount = dato.net_planned_eu_amount;
            updatedCumulative_initial_pre_financing = dato.cumulative_initial_pre_financing;
            updatedCumulative_additional_initial_pre_financing = dato.cumulative_additional_initial_pre_financing;
            updatedRecovery_of_initial_pre_financing = dato.recovery_of_initial_pre_financing;
            updatedNet_initial_pre_financing = dato.net_initial_pre_financing;
            updatedCumulative_annual_pre_financing = dato.cumulative_annual_pre_financing;
            updatedAnnual_pre_financing_covered_by_expenditure = dato.annual_pre_financing_covered_by_expenditure;
            updatedRecovery_of_annual_pre_financing = dato.recovery_of_annual_pre_financing;
            updatedNet_annual_pre_financing = dato.net_annual_pre_financing;
            updatedCumulative_interim_payment = dato.cumulative_interim_payment;
            updatedRecovery_of_expense = dato.recovery_of_expense;
            updatedNet_interim_payment = dato.net_interim_payment;
            updatedTotal_net_payment = dato.total_net_payment;
            updatedEu_payment_rate = dato.eu_payment_rate;
            
        } catch (error) {
            console.log(`Error parsing result: ${error}`);
        }
        const status = await res.status;
        resultStatus = status;
        if (status == 404) {
            message = `El elemento: ${ms_name} ${fund}; No encontrado`;
        }
        if (status == 500) {
            message = "Error interno";
        }
    }


</script>

Details of {country} {year} {day}