/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/********************/   
/** Main Variables **/
/********************/

// List of students
const studentList = document.getElementsByClassName('student-item');
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

/* createSearch function, create the search field and search button */

const createSearch = () => {
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
}

/* appendPageLinks function, create the links for the pagination */

const appendPageLinks = (list) => {
   // select the main container
   const pageDiv = document.getElementsByClassName('page');
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
         showPage(studentList, e.target.textContent);
      })
   }
}

// call showPage function with the first page as argument when the page is loaded
showPage(studentList, 1);

// call createSearch function when the page is loaded
createSearch();

// call appendPageLinks to create the pagination links
appendPageLinks(studentList);
