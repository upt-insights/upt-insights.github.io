<script>
  import Card from "$lib/Card.svelte";
  import CardError from "$lib/CardError.svelte";
  import CardLoading from "$lib/CardLoading.svelte";
  import { writable } from "svelte/store";
  const tds = writable(new Date());
  // import KpiRow from './kpirow.svelte'
  import { data } from "$lib/data.js";
  import { getKPI } from "./kpi.js";
  import Table from "./PMDueTable.svelte";
  const size = 12;
  const title = "PM Due";
  const _getKPIs = async (d) => {
    const json = d;
    const ds0 = json.MaintenanceV1;
    const retval = await getKPI(d);
    tds.set(ds0.tds); //don't update tds until retval is returned without errors
    return retval;
  };
</script>

<Card {size} {title} tds={$tds}>
  {#await _getKPIs($data)}
    <CardLoading />
  {:then kpi}
    <Table rows={kpi.rows} rowDetails={kpi.rowDetails} keyName={"Terminal"} />
  {:catch error}
    <CardError {error} />
  {/await}
</Card>
