function createDOMWithClassName(tag, name) {
    let newDOM = document.createElement(`${tag}`);
    newDOM.className = `${name}`;

    return newDOM;
}

function appendChildren(toBeAddedTo, arr) {
    for (let i = 0; i < arr.length; i++) {
        toBeAddedTo.appendChild(arr[i]);
    }
}

export { appendChildren, createDOMWithClassName };
