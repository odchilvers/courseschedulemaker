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

    // const htmlElement = document.querySelector(".classInfoForms");
    // const schedule = ScheduleClass.from(htmlElement);
    // console.log(schedule);

    refreshCourses();
}

function createCourseDiv() {
    const template = myDiv.cloneNode(true);

    // Add unique IDs to each input element in the cloned div
    template.querySelectorAll('input').forEach((input, i) => {
        input.id = `input-${elementCount}-${i}`;
    });

    const localSectionDiv = template.getElementsByClassName("sectionInfoForms")[0];
    const localSectionContainer = template.getElementsByClassName("sectionWrapper")[0];
    const localSectionSelect = template.getElementsByClassName("numSections")[0];

    localSectionSelect.addEventListener("change", s => {
        localSectionContainer.innerHTML = '';
        for (let i = 0; i < s.target.value; i++) {
            localSectionContainer.appendChild(localSectionDiv.cloneNode(true));
        }
    });

    elementCount++;

    return template;
}

function getValuesOf(className, element = document) {
    const values = [];
    for (let elem of element.getElementsByClassName(className)) {
      const input = elem.querySelector('input');
      if (input) {
        values.push(input.value);
      }
    }
    console.log(JSON.stringify(values));
    return values;
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
        const days = ["monday", "wednesday"]; // TODO
        const start = getValuesOf("startTime", HTMLelement)[0];
        const end = getValuesOf("endTime", HTMLelement)[0];
        return new ScheduleClass(name, sections, days, start, end);
    }

}

// online testing code!!!!!!!!

const submitButton = document.querySelector('button[type="submit"]');
submitButton.addEventListener('click', submitForm);

function submitForm(event) {
  event.preventDefault(); // prevent the default form submission

  const formData = getFormData(); // collect the data from the form

  // send the form data to the server
  fetch('/submit-form', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      console.log('Form submitted successfully');
    } else {
      console.error('Form submission failed');
    }
  })
  .catch(error => {
    console.error('An error occurred while submitting the form', error);
  });
}

function getFormData() {
  const formData = [];

  // get the number of classes
  const numberOfClasses = document.querySelector('.numClasses').value;
  formData.push({ numberOfClasses });

  // get the class info for each class
  const classWrappers = document.querySelectorAll('.classWrapper');
  for (let i = 0; i < classWrappers.length; i++) {
    const classWrapper = classWrappers[i];

    const courseType = classWrapper.querySelector('.courseType').value;

    const numberOfSections = classWrapper.querySelector('.numSections').value;

    const sectionInfos = [];
    const sectionWrappers = classWrapper.querySelectorAll('.sectionWrapper');
    for (let j = 0; j < sectionWrappers.length; j++) {
      const sectionWrapper = sectionWrappers[j];

      const sectionNumber = sectionWrapper.querySelector('.sectionNumber').value;

      const daysOfWeek = [];
      if (sectionWrapper.querySelector('.sunday').checked) {
        daysOfWeek.push('Su');
      }
      if (sectionWrapper.querySelector('.monday').checked) {
        daysOfWeek.push('M');
      }
      if (sectionWrapper.querySelector('.tuesday').checked) {
        daysOfWeek.push('Tu');
      }
      if (sectionWrapper.querySelector('.wednesday').checked) {
        daysOfWeek.push('W');
      }
      if (sectionWrapper.querySelector('.thursday').checked) {
        daysOfWeek.push('Th');
      }
      if (sectionWrapper.querySelector('.friday').checked) {
        daysOfWeek.push('F');
      }
      if (sectionWrapper.querySelector('.saturday').checked) {
        daysOfWeek.push('Sa');
      }

      const startTime = sectionWrapper.querySelector('.startTime').value;

      const endTime = sectionWrapper.querySelector('.endTime').value;

      sectionInfos.push({
        sectionNumber,
        daysOfWeek,
        startTime,
        endTime
      });
    }

    formData.push({
      courseType,
      numberOfSections,
      sectionInfos
    });
  }

  return formData;
}


// function createCourseDiv() { // creates a course div for each course
//     const template = myDiv.cloneNode(true); // made as a template for each copy node

//     const localSectionDiv = template.getElementsByClassName("sectionInfoForms")[0];
//     const localSectionContainer = template.getElementsByClassName("sectionWrapper")[0];
//     const localSectionSelect = template.getElementsByClassName("numSections")[0];

//     localSectionSelect.addEventListener("change", s => { // adds event listeners for the sections
//         localSectionContainer.innerHTML = '';
//         for (let i = 0; i < s.target.value; i++) {
//             localSectionContainer.appendChild(localSectionDiv.cloneNode(true));
//         }
//     });

//     return template;
// }

// function getValuesOf(className, element = document) { // stores class course names into an array
//     const values = [];
//     for (let elem of element.getElementsByClassName(className)) {
//         values.push(elem.value);
//     }
//     console.log(JSON.stringify(values)); // array of class course names
//     return values;
// }