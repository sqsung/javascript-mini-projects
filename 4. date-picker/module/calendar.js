import { createDOMWithClassName, appendChildren } from "../utils/dom.js";
import getFullDate from "../utils/getFullDate.js";

const monthsArr = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const weekdaysArr = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const calendarFunction = ($calendarContainer) => {
    const calendarDOM = createDOMWithClassName("div", "calendar");
    const calendarNav = createDOMWithClassName("div", "calendar-nav");
    const calendarGrid = createDOMWithClassName("div", "calendar-grid");
    const currentMonthAndYear = createDOMWithClassName("div", "month-and-year");
    const previousButton = createDOMWithClassName("i", "bi bi-caret-left-fill previous");
    const nextButton = createDOMWithClassName("i", "bi bi-caret-right-fill next");
    let currentYear = createDOMWithClassName("p", "year");
    let currentMonth = createDOMWithClassName("p", "month");
    const weekdays = createDOMWithClassName("div", "weekdays");
    const monthDays = createDOMWithClassName("div", "month-day");
    const datePickerInput = $calendarContainer.querySelector(".date-picker-input");

    for (let i = 0; i < weekdaysArr.length; i++) {
        let day = document.createElement("p");
        day.innerHTML = `${weekdaysArr[i]}`;
        weekdays.appendChild(day);
    }

    const date = new Date();

    function updateCalendar(newDate) {
        newDate.setDate(1);
        const firstDay = newDate.getDay();
        const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
        const lastDayIndex = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDay();
        const prevMonthLastDay = new Date(newDate.getFullYear(), newDate.getMonth(), 0).getDate();
        const nextMonthDay = 7 - lastDayIndex - 1;
        currentYear.innerHTML = date.getFullYear();
        currentMonth.innerHTML = monthsArr[date.getMonth()];
        const nextMonth = monthsArr[(monthsArr.indexOf(currentMonth.innerHTML) + 1) % 12];
        const prevMonth = monthsArr[Math.abs(monthsArr.indexOf(currentMonth.innerHTML) - 1) % 12];

        let days = "";
        for (let i = firstDay; i > 0; i--) {
            let $id = getFullDate(currentYear.innerHTML, prevMonth, prevMonthLastDay - i + 1);
            days += `<div class="prev-month-day d" id="${$id}">${prevMonthLastDay - i + 1}</div>`;
        }

        for (let i = 1; i <= lastDay; i++) {
            let $id = getFullDate(currentYear.innerHTML, currentMonth.innerHTML, i);
            if (i === new Date().getDate() && newDate.getMonth() === new Date().getMonth()) {
                days += `<div class="every-day today d" id="${$id}">${i}</div>`;
            } else if ((i + firstDay - 1) % 7 === 0) {
                days += `<div class="every-day sunday d" id="${$id}">${i}</div>`;
            } else {
                days += `<div class="every-day d" id="${$id}">${i}</div>`;
            }
        }

        for (let i = 1; i <= nextMonthDay; i++) {
            let $id = getFullDate(currentYear.innerHTML, nextMonth, i);
            days += `<div class="next-month-day d" id="${$id}">${i}</div>`;
        }

        monthDays.innerHTML = days;
    }

    updateCalendar(date);

    appendChildren($calendarContainer, [calendarDOM]);
    appendChildren(calendarDOM, [calendarNav, calendarGrid]);
    appendChildren(calendarNav, [previousButton, currentMonthAndYear, nextButton]);
    appendChildren(calendarGrid, [weekdays, monthDays]);
    appendChildren(currentMonthAndYear, [currentMonth, currentYear]);

    let curMonthDay = $calendarContainer.querySelector(".month-day");
    let clickableDay = [...$calendarContainer.querySelectorAll(".d")];

    calendarNav.addEventListener("click", (event) => {
        if (event.target === previousButton) {
            date.setMonth(date.getMonth() - 1);
            updateCalendar(date);
            curMonthDay = $calendarContainer.querySelector(".month-day");
            clickableDay = [...$calendarContainer.querySelectorAll(".d")];
        }

        if (event.target === nextButton) {
            date.setMonth(date.getMonth() + 1);
            updateCalendar(date);
            curMonthDay = $calendarContainer.querySelector(".month-day");
            clickableDay = [...$calendarContainer.querySelectorAll(".d")];
        }
    });

    monthDays.addEventListener("mouseover", (event) => {
        event.target.classList.add("active");
    });

    monthDays.addEventListener("mouseout", (event) => {
        event.target.classList.remove("active");
    });

    curMonthDay.addEventListener("click", (event) => {
        if (clickableDay.includes(event.target)) {
            if ([...$calendarContainer.querySelectorAll(".clicked")].length === 0) {
                event.target.classList.add("clicked");
            } else {
                $calendarContainer.querySelector(".clicked").classList.remove("clicked");
                event.target.classList.add("clicked");
            }

            datePickerInput.value = event.target.id;
            console.log(event.target.id);
        }
    });
};

export default calendarFunction;
