import datePickerFunction from "./module/date-picker.js";
import calendarFunction from "./module/calendar.js";

const $container = [...document.querySelectorAll('.container')];

for(let i = 0; i < $container.length; i++) {
  datePickerFunction($container[i]);
  const finalDatePicker = document.getElementsByClassName('date-picker')[i];
  calendarFunction($container[i]);
  const finalCalendar = document.getElementsByClassName('calendar')[i];
  finalDatePicker.appendChild(finalCalendar);

  const datePickerInput = document.getElementsByClassName('date-picker-input')[i];
  const calendarContainer = document.getElementsByClassName('calendar')[i];
  calendarContainer.style.display = 'none';

  document.addEventListener('click', event => {
    if (event.target === datePickerInput) {
      if (calendarContainer.style.display === 'none') calendarContainer.style.display = 'block';
      else calendarContainer.style.display = 'none';
    } else if (event.target === $container[i]) calendarContainer.style.display = 'none';
  });
};

