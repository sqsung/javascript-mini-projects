const StarRating = ($container) => {
    const starNum = $container.getAttribute("data-max-rating");
    const starRatingContainer = document.createElement("div");

    starRatingContainer.className = "star-rating-container";
    $container.appendChild(starRatingContainer);

    for (let i = 0; i < starNum; i++) {
        const star = document.createElement("i");

        star.className = "bx bxs-star star";
        starRatingContainer.appendChild(star);
    }

    $container.addEventListener("mouseover", (event) => {
        const arr = Array.prototype.slice.call(starRatingContainer.children);

        event.target.classList.add("hovered");
        arr.forEach((star) =>
            arr.indexOf(star) < arr.indexOf(event.target) ? star.classList.add("hovered") : star.classList
        );
    });

    $container.addEventListener("mouseout", (event) => {
        const arr = Array.prototype.slice.call(starRatingContainer.children);

        event.target.classList.remove("hovered");
        arr.forEach((star) =>
            arr.indexOf(star) < arr.indexOf(event.target) ? star.classList.remove("hovered") : star.classList
        );
    });

    $container.addEventListener("click", (event) => {
        const arr = Array.prototype.slice.call(starRatingContainer.children);

        arr.forEach((star) => star.classList.remove("selected"));
        event.target.classList.add("selected");
        arr.forEach((star) =>
            arr.indexOf(star) < arr.indexOf(event.target) ? star.classList.add("selected") : star.classList
        );

        if (event.target === starRatingContainer) event.target.parentNode.setAttribute("rating", "0");
        else event.target.parentNode.parentNode.setAttribute("rating", arr.indexOf(event.target) + 1);

        let change = new CustomEvent("rating-change", {
            detail: $container.getAttribute("rating"),
        });
        $container.dispatchEvent(change);
    });
};

export default StarRating;
