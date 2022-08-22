/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

// ************************************** GLOBAL VARIABLES **************************************

/**
 * @description definition of global variables
 * @myList refers to the navbar UL
 * @mySections refers to the all the sections found on the page
 * @navUpButton is an i created for the navigation up button which is from fontawesome.com
 * and its appended to @footer which refers to page footer
 */
// <i class="fa-solid fa-angles-up"></i>
var myList = document.getElementById("navbar__list");
var mySections = document.querySelectorAll("section");
var navUpButton = document.createElement("i");
var footer = document.querySelector(".page__footer");
navUpButton.classList.add("fa-solid", "fa-angles-up", "fa-2x", "navUpButton");
navUpButton.style.display = "none";
footer.appendChild(navUpButton);

// ************************************** HELPER FUNCTIONS **************************************

/**
 * @description simply creates a single nav button as an "li" element
 * and appends it to @myList mentioned above.
 * @param {object} list - the navBar ul
 * @param {int} index - used to correctly write textContent of each navButton
 */

function createNavButton(list, index) {
  var navButton = document.createElement("li");
  navButton.textContent = "Section " + index;
  navButton.classList.add("navbar__menu", "menu__link");
  navButton.addEventListener("click", navigateToSection);
  list.appendChild(navButton);
}

/**
 * @description a helper function to remove active class from all the sections
 * commented code is a different soultion but has variables declared that are not used.
 */

function removeActiveClass() {
  for (const section of mySections) {
    section.classList.remove("your-active-class");
  }
  // mySections.forEach(function (currentValue, currentIndex, listObj) {
  //   mySections[currentIndex].classList.remove("your-active-class");
  // });
}

/**
 * @description helper function for adding class while scrolling which is used in eventListener
 * note; first if condition to check if collapsed to continue to next loop
 */

function scrollHelperFunction() {
  for (var i = 1; i <= mySections.length; i++) {
    const rect = document.getElementById("section" + i).getBoundingClientRect();
    if (rect.bottom == 0 && rect.top == 0) {
      continue;
    }
    if (rect.bottom <= window.innerHeight && rect.top >= 0) {
      // usage of {window.innerHeight} to check on current viewport
      var mySection = document.querySelector("#section" + i);
      removeActiveClass();
      mySection.classList.add("your-active-class");
    }
  }
}

function collapseSection(event)
{
    const paragraphs = event.target.previousElementSibling.children[0].querySelectorAll("p");
    if (paragraphs[0].style.display === "block") {
      Array.from(paragraphs).forEach(function (p) {
        p.style.display = "none";
      });
      event.target.classList.replace("fa-minimize", "fa-maximize");
    } else {
      Array.from(paragraphs).forEach(function (p) {
        p.style.display = "block";
      });
      event.target.classList.replace("fa-maximize", "fa-minimize");
    }
}

// ************************************** MAIN FUNCTIONS **************************************

/**
 * @description loop until number of sections and using createNavButton helper function to createNavButtons
 */
function addNavButtons() {
  for (var i = 1; i <= mySections.length; i++) {
    createNavButton(myList, i);
  }
}

/**
 * @description function to navigateToSection used in eventListener for nav buttons
 */
function navigateToSection(event) {
  event.preventDefault();
  var section = event.target.textContent.split(" ")[1];
  var mySection = document.querySelector("#section" + section);
  mySection.scrollIntoView({ behavior: "smooth", block: "start" });
  removeActiveClass();
  mySection.classList.add("your-active-class");
}

function collapsibleSections() {
  for (var i = 0; i < mySections.length; i++) {
    const button = document.createElement("i");
    button.classList.add("fa-solid", "fa-minimize", "fa-2x");
    const paragraphs = mySections[i].children[0].querySelectorAll("p");
    Array.from(paragraphs).forEach(function (p) {
      p.style.display = "block";
    });
    button.addEventListener("click", collapseSection);
    mySections[i].insertAdjacentElement("afterend", button);
  }
}

// ************************************** EVENT LISTENERS **************************************

/**
 * @navUpButton event listener for clicks scrolls to top of screen using querySelector("html")
 */
navUpButton.addEventListener("click", function () {
  document.querySelector("html").scrollIntoView({ behavior: "smooth" });
  removeActiveClass();
});

/**
 * @scroll event listener for scrolling which displays navUpButton and also uses
 * @scrollHelperFunction to add class your-active-class to section currently viewed.
 */
document.addEventListener("scroll", function () {
  if (window.scrollY < 470) {
    myList.style.display = "block";
    
  } else {
    myList.style.display = "none";
  }
  if(window.scrollY>1500){
    navUpButton.style.display = "block";
  }
  else{
    navUpButton.style.display = "none";
  }
  scrollHelperFunction();
});

addNavButtons();
collapsibleSections();
