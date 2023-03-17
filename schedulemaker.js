// javascript that goes with the schedulemaker html

const myDiv = document.getElementById("classInfoForms"); // gets the classInfoForms data
const container = document.getElementById("classWrapper");
const select = document.getElementById("numClasses"); // gets number of classes input
let elementCount = 0;

window.onload = function () { // makes sure to run when the window has loaded
    select.addEventListener("change", e => {
        elementCount = e.target.value;
        container.innerHTML = '';
        for (var i = 0; i < elementCount; i++) {
            container.appendChild(myDiv.cloneNode(true)); // clones the forms to display
        }
    });
}