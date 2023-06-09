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

    const htmlElement = document.querySelector(".classInfoForms");
    const schedule = ScheduleClass.from(htmlElement);
    console.log(schedule);

    refreshCourses();
}

class ScheduleClass {
    constructor(name, sectionNumbers = [], days = [], startTime, endTime) {
        this.name = name;
        this.sectionNumbers = sectionNumbers;
        this.days = days;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    static from(HTMLelement) {
        const name = getValuesOf("courseType", HTMLelement)[0];
        const sections = getValuesOf("sectionNumber", HTMLelement);
        const days = getDaysOf();
        const start = getValuesOf("startTime", HTMLelement)[0];
        const end = getValuesOf("endTime", HTMLelement)[0];
        return new ScheduleClass(name, sections, days, start, end);
    }

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

function getValuesOf(className, element = document) { // stores class course names into an array
    const values = [];
    for (let elem of element.getElementsByClassName(className)) {
        values.push(elem.value);
    }
    console.log(JSON.stringify(values)); // array of class course names
    return values;
}

function getDaysOf() { // stores class course names into an array
    const days = []; // create an empty array to hold the checked days
    const checkboxes = document.querySelectorAll('.sunday, .monday, .tuesday, .wednesday, .thursday, .friday, .saturday');

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            days.push(checkbox.className); // add the class name of the checked checkbox (i.e., the day of the week) to the array
        }
    });
    console.log(days);
    return days;
}

const submitButton = document.getElementsByClassName("button-19")[0]; // gets info from the page to store into scheduleclass
submitButton.addEventListener("click", submitForm);

function submitForm() {
    const htmlElement = document.querySelector(".classInfoForms");
    const schedule = ScheduleClass.from(htmlElement);
    console.log(schedule);
    // do something with the schedule object
}

function scrollDown() { // scroll to middle of page where the how to guide is
    const middle = Math.floor(document.body.scrollHeight / 2 - window.innerHeight / 2);
    window.scroll({
        top: middle,
        left: 0,
        behavior: 'smooth'
      });
}

function scrollUp() { // scroll to middle of page where the how to guide is
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

document.onreadystatechange = function() {
    if (document.readyState !== "complete") {
        document.querySelector(
        "body").style.visibility = "hidden";
        document.querySelector(
        "#loader").style.visibility = "visible";
    } else {
        document.querySelector(
        "#loader").style.display = "none";
        document.querySelector(
        "body").style.visibility = "visible";
    }
};