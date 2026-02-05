export const classByScore = (s) => {
  if (s < 51) return 'text-success'
  if (s < 101) return 'text-warning'
  return 'text-danger'
}
export const classByDtc = (s) => {
  if (s > 4) return 'text-danger';
  if (s > 3) return 'text-warning';
  return 'text-success';
};
export const classByPct = (s) => {
  if (s < 70) return 'text-danger';
  if (s < 81) return 'text-warning';
  return 'text-success';
};