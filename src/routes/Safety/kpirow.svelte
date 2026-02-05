<script>
  export let row

  import { number_format } from '$lib/frtl-utility'
  import { classByScore, classByDtc, classByPct } from './util.js'
  import KpiRowDetail from './kpirowdetail.svelte'

  const sumVal = `$${number_format(row[1], 2)}`
  let show = false

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="row p-2 x"
  on:click={() => show = !show}
  on:keypress={() => show = !show}>
  <div class="col-4">{row.Terminal}</div>
  <div class="col-3 text-end {classByScore(row.Score)}">{row.Score}</div>
  <div class="col-2 text-end {classByDtc(row.dtc)}">{row.dtc}</div>
  <div class="col-3 text-end {classByPct(row.pct.split('%')[0])}">{row.pct}</div>
</div>
{#if show}
  <KpiRowDetail Terminal={row.Terminal} />
{/if}

<style>
  .x:hover {
    background-color: #cbcbcb;
    color: white;
  }
</style>