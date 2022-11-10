import StarRating from "./star-rating/index.js";

const $containers = [...document.querySelectorAll(".star-rating")];
const $currentRatings = document.querySelectorAll(".current-rating > span");
const $lastLink = document.getElementsByTagName("link")[HTMLCollection.length + 1];
$lastLink.insertAdjacentHTML("afterend", '<link href="star-rating/theme.css" rel="stylesheet" />');

$containers.forEach(($container, i) => {
    StarRating($container);

    $container.addEventListener("rating-change", (e) => {
        const rating = e.detail;
        $currentRatings[i].textContent = rating;
    });
});
