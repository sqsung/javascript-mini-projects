const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getFullDate(yyyy, mm, dd) {
  let $yyyy = yyyy;
  let $mm;
  let $dd; 

  monthsArr.indexOf(mm) + 1 < 10 ? $mm = `0${monthsArr.indexOf(mm) + 1}` : $mm = monthsArr.indexOf(mm) + 1;
  dd < 10 ? $dd = `0${dd}` : $dd = dd;

  return `${$yyyy}-${$mm}-${$dd}`;
}

export default getFullDate;