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

function courseNameType(){
    var courseNameType = document.getElementById("courseType").value;
    alert(courseNameType); // !!!!!!!!!! take out but is working!!!! 
}
    

// figure out how to make a class object that takes in name, number of sections (sections to be object that takes in days to meet and times)

// const sectionDiv = document.getElementById("sectionInfoForms"); // gets the classInfoForms data
// const sectionContainer = document.getElementById("sectionWrapper");
// const sectionSelect = document.getElementById("numSections"); // gets number of classes input
// let sectionElementCount = 0;

// window.onload = function () { // makes sure to run when the window has loaded
//     sectionSelect.addEventListener("change", s => {
//         sectionElementCount = s.target.value;
//         sectionContainer.innerHTML = '';
//         for (var i = 0; i < sectionElementCount; i++) {
//             sectionContainer.appendChild(sectionDiv.cloneNode(true)); // clones the forms to display
//         }
//     });
// }