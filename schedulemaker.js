// javascript that goes with the schedulemaker html

const myDiv = document.getElementsByClassName("classInfoForms")[0]; // gets the classInfoForms data
const container = document.getElementsByClassName("classWrapper")[0];
const select = document.getElementsByClassName("numClasses")[0]; // gets number of classes input
let elementCount = 0;

window.onload = function () { // makes sure to run when the window has loaded
    select.addEventListener("change", refreshCourses);

    function refreshCourses() { // makes event listener for each course
        container.innerHTML = '';
        for (var i = 0; i < select.value; i++) {
            container.appendChild(createCourseDiv()); // clones the forms to display
        }
    }

    refreshCourses();
}

function createCourseDiv() { // creates a course div for each course
    const template = myDiv.cloneNode(true); // made as a template for each copy node

    const localSectionDiv = template.getElementsByClassName("sectionInfoForms")[0];
    const localSectionContainer = template.getElementsByClassName("sectionWrapper")[0];
    const localSectionSelect = template.getElementsByClassName("numSections")[0];

    localSectionSelect.addEventListener("change", s => { // adds event listeners for the sections
        localSectionContainer.innerHTML = '';
        for (let i = 0; i < s.target.value; i++) {
            localSectionContainer.appendChild(localSectionDiv.cloneNode(true));
        }
    });

    return template;
}

function courseNameType() {
    var courseNameType = document.getElementByClassName("courseType").value;
    alert(courseNameType); // !!!!!!!!!! take out but is working!!!! 
}

// figure out how to make a class object that takes in name, number of sections (sections to be object that takes in days to meet and times)