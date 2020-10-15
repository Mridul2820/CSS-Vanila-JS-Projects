const lang = navigator.language;

let date = new Date();
let dayNumber = date.getDate();
let month = date.getMonth();
let dayName = date.toLocaleString(lang,{weekday: 'long'});
let monthName = date.toLocaleString(lang,{month: 'long'});
let year = date.getFullYear();


document.getElementById('month-name').innerHTML = monthName;
document.getElementById('day-name').innerHTML = dayName;
document.getElementById('day-number').innerHTML = dayNumber;
document.getElementById('year').innerHTML = year;