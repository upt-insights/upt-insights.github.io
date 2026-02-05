import { sumByMany } from '$lib/frtl-utility'

export const getKPI = async (d) => {

    const getSafetyScore = (x, y) => (10 * (x / y)).toFixed(0)
    const getAvgTTCWeighted = v => {
        let sumEvents = v.reduce((a, { Events: b }) => a + b, 0)
        //calculate pct Coached
        let sumCoached = v.reduce((a, { Coached: b }) => a + b, 0)
        let pctCoached = (100 * (sumCoached / sumEvents)).toFixed(0);
        //calculate weighted Avg TTC
        let weightedSum = v.map(x => x.Events * x.AvgTTC).reduce((a, b) => a + b, 0)
        let avgWeightedTTC = (weightedSum / sumEvents).toFixed(1)
        // if they are NaN, set to 0
        if (isNaN(pctCoached)) { pctCoached = 0 }
        if (isNaN(sumCoached)) { sumCoached = 0 }
        if (isNaN(sumEvents)) { sumEvents = 0 }
        if (isNaN(weightedSum)) { weightedSum = 0 }
        if (isNaN(avgWeightedTTC)) { avgWeightedTTC = 0 }
        return {
            dtc: avgWeightedTTC,
            pct: `${pctCoached}% (${sumCoached}/${sumEvents})`,
            sumCoached: sumCoached,
            sumEvents: sumEvents,
        }
    }
    const json = d
    const ds0 = json.SafetyV2
    const dt0 = ds0.SafetyScoreV2
    const dt1 = ds0.TimeToCoachV2

    return {
        rowsByTerminal: sumByMany(dt0, 'Terminal', 'ScoreN', 'ScoreD')
            .map(x => ({
                Terminal: x.Terminal,
                Score: getSafetyScore(x.ScoreN, x.ScoreD),
                ...getAvgTTCWeighted(dt1.filter(y => y.Terminal === x.Terminal)),
            }))
            .filter(x => x.dtc + x.sumCoached + x.sumEvents !== 0)
            .sort((a, b) => a.Terminal.localeCompare(b.Terminal)),
        Company: {
            Score: getSafetyScore(
                dt0.map(x => x.ScoreN).reduce((a, b) => a + b),
                dt0.map(x => x.ScoreD).reduce((a, b) => a + b)),
            ...getAvgTTCWeighted(dt1),
        },
    }
}