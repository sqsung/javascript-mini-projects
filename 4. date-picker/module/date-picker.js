import { createDOMWithClassName, appendChildren } from "../utils/dom.js";

const datePickerFunction = ($container) => {
    const datePickerDOM = createDOMWithClassName("div", "date-picker");
    const datePickerTitle = createDOMWithClassName("div", "date-picker-title");
    const datePickerInput = createDOMWithClassName("input", "date-picker-input");

    datePickerTitle.innerHTML = "Date Picker";
    datePickerInput.placeholder = "Select date";
    datePickerInput.readOnly = "true";

    $container.appendChild(datePickerDOM);
    appendChildren(datePickerDOM, [datePickerTitle, datePickerInput]);
};

export default datePickerFunction;
