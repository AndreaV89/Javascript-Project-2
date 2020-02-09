/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/********************/   
/** Main Variables **/
/********************/

// List of students
const studentList = document.getElementsByClassName('student-item');
// select the main container
const pageDiv = document.getElementsByClassName('page');
// How much items per page
const itemsPerPage = 10;


/*******************/   
/**   Functions   **/
/*******************/

/* showPage function, show the current page */

const showPage = (list, page) => {
   // calculate the first and the last index of the items using the page number and the items per page
   let startIndex = (page * itemsPerPage) - itemsPerPage;
   let endIndex = page * itemsPerPage;
   // loop between every list item
   for (let i = 0; i < list.length; i++) {
      // if the item's index is greater or equal than startIndex and lower than endIndex
      if (i >= startIndex && i < endIndex) {
         // show the item
         list[i].style.display = "block";
      } else {
         // hide the item
         list[i].style.display = "none";
      }
   }
}

/* search function */

function search(list) {
   // Array for results
   let resultsArray = [];
   // Students Name
   const studentNames = document.getElementsByTagName('h3');
   // User input
   const inputField = document.getElementsByTagName("input");
   let input = inputField[0].value.trim().toLowerCase();
   // reset pagination buttons
   const paginationDiv = document.getElementsByClassName('pagination');
   // reset pagination links
   if(paginationDiv.length != 0) {
      pageDiv[0].removeChild(paginationDiv[0]);
   }
   for(let i = 0; i < list.length; i++) {
      // Hide all students
      list[i].style.display = "none";
      if (studentNames[i].innerText.includes(input)) {
         // add students that matches the search in the results array
         resultsArray.push(list[i]);
      }
   }
   // select "no results" text
   const noResults = document.getElementsByTagName('p');
   if (resultsArray.length === 0) {
      // if search matches no student show "no results" text
      noResults[0].style.display = "block";
   } else {
      //else hide it
      noResults[0].style.display = "none";
      // call functions that create the page with the results array as parameters
      showPage(resultsArray, 1);
      appendPageLinks(resultsArray);
   }
 
}



/* createSearch function, create the search field and search button */

const createElements = (list) => {
   // select the header div
   const headerDiv = document.getElementsByClassName("page-header");
   // create the search div
   const searchDiv = document.createElement("DIV");
   // append the search div to the header div
   headerDiv[0].appendChild(searchDiv);
   // add the class "student-search" to the created div
   searchDiv.classList.add("student-search");
   // create and append search input and search button
   const searchInput = document.createElement("INPUT");
   const searchBtn = document.createElement("BUTTON");
   searchDiv.appendChild(searchInput);
   searchDiv.appendChild(searchBtn);
   // add placeholder to input field
   searchInput.setAttribute("placeholder", "Search for students...");
   // add text to button
   searchBtn.textContent = "Search";
   // add event listeners to input field and button
   searchInput.addEventListener('keyup', function () {
      search(list);
   });
   searchBtn.addEventListener('click', function () {
      search(list);
   });
   // create no results text
   const noResults = document.createElement('P');
   noResults.innerHTML = 'Sorry, no results found...';
   pageDiv[0].appendChild(noResults);
   noResults.style.display = 'none';
}

/* appendPageLinks function, create the links for the pagination */

const appendPageLinks = (list) => {
   // create the pagination div
   const div = document.createElement("DIV");
   // add the class "pagination" to the created div
   div.classList.add("pagination");
   // append the div to the main container
   pageDiv[0].appendChild(div);
   // create and append the ul element 
   const ul = document.createElement("UL");
   div.appendChild(ul);
   // calculate the number of page needed (list.length / itemsPerPage) and loop each 10 items
   for(let i = 0; i < (list.length / itemsPerPage); i++) {
      // create and append a li element every 10 items
      const li = document.createElement("LI");
      ul.appendChild(li);
      // create and append links
      const a = document.createElement("A");
      li.appendChild(a);
      // add the class active to the first link
      if(i === 0) {
         a.classList.add("active");
      }
      a.setAttribute("href", "#");
      // set the page number to a elements using the index
      a.innerText = i + 1;
      // add click event listener
      a.addEventListener('click', function(e) {
         // select every link
         let paginationLinks = document.querySelectorAll('.pagination a');
         // loop each link
         for (let i = 0; i < paginationLinks.length; i++) {
            // remove the class "active" to each link
            paginationLinks[i].classList.remove("active");
         }
         // add the class "active" to clicked link
         e.target.classList.add("active");
         // call che showPage function using the textContent of the clicked link as argument for the page number
         showPage(list, e.target.textContent);
      })
   }
}



// call showPage function with the first page as argument when the page is loaded
showPage(studentList, 1);

// call createSearch function when the page is loaded
createElements(studentList);

// call appendPageLinks to create the pagination links
appendPageLinks(studentList);


