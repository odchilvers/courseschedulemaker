// javascript that goes with the schedulemaker html

const myDiv = document.getElementsByClassName("classInfoForms")[0]; // gets the classInfoForms data
const container = document.getElementsByClassName("classWrapper")[0];
const select = document.getElementsByClassName("numClasses")[0]; // gets number of classes input
let elementCount = 0;

const sectionDiv = myDiv.getElementsByClassName("sectionInfoForms")[0]; // gets the sectionInfoForms data
const sectionContainer = myDiv.getElementsByClassName("sectionWrapper")[0];
const sectionSelect = myDiv.getElementsByClassName("numSections")[0]; // gets number of sections input
let sectionElementCount = 0;

window.onload = function () { // makes sure to run when the window has loaded
    select.addEventListener("change", e => {
        elementCount = e.target.value;
        container.innerHTML = '';
        for (var i = 0; i < elementCount; i++) {
            container.appendChild(myDiv.cloneNode(true)); // clones the forms to display
        }
    });
    sectionSelect.addEventListener("change", s => {
        sectionElementCount = s.target.value;
        sectionContainer.innerHTML = '';
        for (var i = 0; i < sectionElementCount; i++) {
            sectionContainer.appendChild(sectionDiv.cloneNode(true)); // clones the forms to display
        }
    });
}

function courseNameType() {
    var courseNameType = document.getElementByClassName("courseType").value;
    alert(courseNameType); // !!!!!!!!!! take out but is working!!!! 
}

// figure out how to make a class object that takes in name, number of sections (sections to be object that takes in days to meet and times)