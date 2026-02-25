export const getKPI = async (d) => {
    const json = d
    const ds0 = json.MaintenanceV1
    const dt0 = ds0.PMDueV1
    const dt1 = ds0.PMDueDetailsV1
    return {
        rows: dt0,
        rowDetails: dt1
            .map(x => ({
                Terminal: x.shop_name,
                Unit: x.unitnumber,
                Type: x.type,
                DuePct: x.duepercent,
                Interval: x.interval,
                Utilization: x.utilization,
                Factor: x.metertype,
                Description: x.description,
                unittype: x.unittype
            }))
            .sort((a, b) =>
                a.Unit.localeCompare(b.Unit)
                || a.Type.localeCompare(b.Type)
            )
    }
}