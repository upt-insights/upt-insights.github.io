import { getDefaultOptions, StackedBarChartLabels, FleetColors } from "$lib/chart-shared";
import { getKPI } from './kpi'
export const getConfig = async (d) => {

  const kpi = await getKPI(d)
  const mylabels = kpi.rowsByTerminal.map(x => x.Terminal)
  const myoptions = getDefaultOptions()
  myoptions.scales.x.ticks.maxTicksLimit = 100;
  myoptions.layout.padding.top = 50
  myoptions.scales.y.display = false
  myoptions.scales.x.stacked = true
  myoptions.scales.y.stacked = true
  myoptions.plugins.tooltip.displayColors = true
  myoptions.plugins.tooltip.callbacks.label = (context) =>
    `${context.dataset.label}: ${context.parsed.y}`
  myoptions.plugins.tooltip.footerColor = '#858796'

  //chartjs data
  const mydata = {
    labels: mylabels,
    datasets: [
      {
        label: 'Coached',
        data: kpi.rowsByTerminal.map(x => x.sumCoached),
        backgroundColor: 'rgb(205, 255, 193, 0.918)',
      },
      {
        label: 'Not Coached',
        data: kpi.rowsByTerminal.map(x => x.sumEvents - x.sumCoached),
        backgroundColor: 'rgba(255, 193, 204, 0.918)',
      },
    ],
  }

  //chartjs config
  const config = {
    type: 'bar',
    data: mydata,
    options: myoptions,
    plugins: [StackedBarChartLabels],
  }
  return config

};