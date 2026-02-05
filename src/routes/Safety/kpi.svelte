<script>
  import Card from '$lib/Card.svelte'
  import CardError from '$lib/CardError.svelte'
  import CardLoading from '$lib/CardLoading.svelte'
  import { writable } from 'svelte/store'
  const tds = writable(new Date())
  import KpiRow from './kpirow.svelte'
  import { data } from '$lib/data.js'
  import { getKPI } from './kpi.js'
  import { downloadcsv } from '$lib/csvdownloader'
  import { classByScore, classByDtc, classByPct } from './util.js'
  import KpiDetails from './kpidetails.svelte'
  const size = 12
  const title = 'Safety Coaching Tracking'
  const _getKPIs = async (d) => {
    const json = d
    const ds0 = json.SafetyV2
    const retval = await getKPI(d)
    tds.set(ds0.tds) //don't update tds until retval is returned without errors
    return retval
  }
  const c1 = () => {
    const json = $data
    const ds0 = json.SafetyV2
    const dt0 = ds0.SafetyScoreV2
    downloadcsv(
      dt0,
      null,
      `Safety Score Data`,
    )
  }
  const c2 = () => {
    const json = $data
    const ds0 = json.SafetyV2
    const dt0 = ds0.TimeToCoachV2
    downloadcsv(
      dt0,
      null,
      `Event Observation Data`,
    )
  }
</script>

<Card {size} {title} tds={$tds}>
  {#await _getKPIs($data)}
    <CardLoading />
  {:then kpi}
  <KpiDetails />
    <div class="container mb-2 small">
      <div class="row bg-light p-2 fw-bold">
        <div class="col-4">Site</div>
        <div class="col-3 text-end">Score</div>
        <div class="col-2 text-end">Days</div>
        <div class="col-3 text-end">Percent</div>
      </div>
      {#each kpi.rowsByTerminal as row}
        <KpiRow {row} />
      {/each}
      <div class="row bg-dark text-light p-2">
        <div class="col-4">Company</div>
        <div class="col-3 text-end {classByScore(kpi.Company.Score)}">{kpi.Company.Score}</div>
        <div class="col-2 text-end {classByDtc(kpi.Company.dtc)}">{kpi.Company.dtc}</div>
        <div class="col-3 text-end {classByPct(kpi.Company.pct.split('%')[0])}">{kpi.Company.pct}</div>
      </div>
    </div>
    <div class="btn-group m-2" role="group">
      <button type="button" class="btn btn-outline-primary" on:click={c1(kpi)}>
        Download Score Data
      </button>
      <button type="button" class="btn btn-outline-primary" on:click={c2(kpi)}>
        Download Event Data
      </button>
    </div>
  {:catch error}
    <CardError {error} />
  {/await}
</Card>
