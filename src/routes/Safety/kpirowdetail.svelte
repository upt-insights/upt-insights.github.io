<script>
  export let Terminal
  import { sumByMany } from '$lib/frtl-utility'
  import Table from '$lib/Table.svelte'
  import { data } from '$lib/data.js'
  const getSafetyScore = (x, y) => (10 * (x / y)).toFixed(0)
  // 100 or greater red, 30 or below green
  const getHighlighting = (r) =>
      r.Score >= 100
        ? 'hl-red'
        : r.Score <= 30
        ? 'hl-green'
        : ''

  const json = $data
  const ds0 = json.SafetyV2
  const dt0 = ds0.SafetyScoreV2
    .filter((x) => x.Terminal === Terminal)
    .map( x=> ({
      Driver: x.Driver,
      Score: getSafetyScore(x.ScoreN, x.ScoreD),
    }))
    .sort((a, b) => a.Score - b.Score)
    .map(row=>({...row, rowclass : getHighlighting(row)}))
  const dt1 = ds0.TimeToCoachV2
    .filter((x) => x.Terminal === Terminal)
    .map( x => ({
      Driver: x.Driver,
      Days: x.AvgTTC.toFixed(1),
      Percent: `${(100*x.Coached/x.Events).toFixed(1)}% (${x.Coached}/${x.Events})`
    }))
  const tableclass= 'smaller-text m-0 mt-2 text-nowrap table table-bordered table-sm table-hover small w-90'
  const twist = false
  
</script>

<Table caption="Score Data (6 Week Cumulative)" rows={dt0} {tableclass} {twist} />
<Table caption="Event Data (Last 30 Days)" rows={dt1} {tableclass} {twist} />