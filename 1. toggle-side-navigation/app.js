const bodyDOM = document.querySelector("body");
const navDOM = document.querySelector("nav");
const toggleButtonDOM = document.querySelector(".toggle");

toggleButtonDOM.addEventListener("click", () => {
    bodyDOM.classList.remove("preload");
    navDOM.classList.toggle("active");

    if (localStorage.getItem("sideMenu") === "close") {
        localStorage.setItem("sideMenu", "open");
    } else {
        localStorage.setItem("sideMenu", "close");
    }
});

window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("sideMenu") === "close") navDOM.classList.remove("active");
    else navDOM.classList.add("active");
    bodyDOM.style.visibility = "visible";
});
