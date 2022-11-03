import { createDOMWithClassName, appendChildren } from '../utils/dom.js';

const monthsArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekdaysArr = ['SUN', 'MON','TUE', 'WED', 'THU', 'FRI', 'SAT'];
const date = new Date();

const calendarFunction = ($calendarContainer) => {
  const calendarDOM = createDOMWithClassName('div', 'calendar');
  const calendarNav = createDOMWithClassName('div', 'calendar-nav');
  const calendarGrid = createDOMWithClassName('div', 'calendar-grid');
  
  const currentMonthAndYear = createDOMWithClassName('div', 'month-and-year');
  const previousButton = createDOMWithClassName('i', 'bi bi-caret-left-fill previous');
  const nextButton = createDOMWithClassName('i', 'bi bi-caret-right-fill next');

  let currentYear = createDOMWithClassName('p', 'year'); 
  let currentMonth = createDOMWithClassName('p', 'month'); 

  const weekdays = createDOMWithClassName('div', 'weekdays');
  const monthDays = createDOMWithClassName('div', 'month-day');

  for(let i = 0; i < weekdaysArr.length; i++) {
    let day = document.createElement('p');
    day.innerHTML = `${weekdaysArr[i]}`;
    weekdays.appendChild(day);
  };

  let accessibleDays = [];
  const updateCalendar = (newDate) => {
    newDate.setDate(1);
    const firstDay = newDate.getDay();
    const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
    const lastDayIndex = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDay();
    const prevMonthLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();
    const nextMonthDay = 7 - lastDayIndex - 1;
    
    currentYear.innerHTML = date.getFullYear();
    currentMonth.innerHTML = monthsArr[date.getMonth()];

    let days = '';
    for(let i = firstDay; i > 0; i--) {
      days += `<div class="prev-month-day">${prevMonthLastDay - i + 1}</div>`;
    };
  
    for(let i = 1; i <= lastDay; i++) {
      if (i === new Date().getDate() && newDate.getMonth() === new Date().getMonth()) {
        days += `<div class="every-day today">${i}</div>`;
      } else if ((i + firstDay - 1) % 7 === 0) {
        days += `<div class="every-day sunday">${i}</div>`;  
      } else {
        days += `<div class="every-day">${i}</div>`;
      };
    };
  
    for(let i = 1; i <= nextMonthDay; i++) {
      days += `<div class="next-month-day">${i}</div>`;
    };
  
    monthDays.innerHTML = days;
    accessibleDays = [...document.getElementsByClassName('every-day')];
  };

  updateCalendar(date);  
  appendChildren(currentMonthAndYear, [currentMonth, currentYear]);
  appendChildren(calendarNav, [previousButton, currentMonthAndYear, nextButton]);
  appendChildren($calendarContainer, [calendarDOM]);
  appendChildren(calendarDOM, [calendarNav, calendarGrid]);
  appendChildren(calendarGrid, [weekdays, monthDays]);

  previousButton.addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    updateCalendar(date);
  });

  nextButton.addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    updateCalendar(date);   
  });

  monthDays.addEventListener('mouseover', event => {
    event.target.classList.add('active');
  });

  monthDays.addEventListener('mouseout', event => {
    event.target.classList.remove('active');
  });

  const datePickerInput = document.getElementsByClassName('date-picker-input')[0];
  
  monthDays.addEventListener('click', event => {
    if (event.target === weekdays || event.target === monthDays || !accessibleDays.includes(event.target)) return;

    if ([...document.getElementsByClassName('clicked')].length > 0) {
      document.getElementsByClassName('clicked')[0].classList.remove('clicked');
    }    
    event.target.classList.add('clicked');
    
    const yyyy = currentYear.innerHTML;

    let mm;
    if (currentMonth.innerHTML === 'October' || currentMonth.innerHTML === 'November' || currentMonth.innerHTML === 'December') {
      mm = monthsArr.indexOf(currentMonth.innerHTML) + 1;
    } else {
      mm = `0${monthsArr.indexOf(currentMonth.innerHTML) + 1}`
    }
    
    let dd; 
    if (document.getElementsByClassName('clicked')[0].innerHTML < 10) {
      dd = `0${document.getElementsByClassName('clicked')[0].innerHTML}`
    } else {
      dd = document.getElementsByClassName('clicked')[0].innerHTML;
    }
    
    datePickerInput.value = (`${yyyy}-${mm}-${dd}`);
  });
};

export default calendarFunction;