export const dateToString = date => {
  const d = new Date(date);
  const mlist = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
  
  const month = mlist[d.getMonth()];
  const minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
  const dateString = `${d.getDate()} ${month} ${d.getFullYear()}, ${d.getHours()}:${minutes}`;

  return dateString;
}