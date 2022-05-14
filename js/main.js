//Fetch using book API
document.querySelector('#getBook').addEventListener('click', getFetch)
document.querySelector('#ISBN-Input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    getFetch()
  }
});

function getFetch(){
  const choice = document.querySelector('input').value
  console.log(choice)

  const url = `https://openlibrary.org/isbn/${choice}.json`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        var bookName = data.title
        if (bookName == undefined){
        alertUser()
        }else{
        addBookTable(bookName) 
        } 
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}
function alertUser(){
  alert("Book not Found or incorrect ISBN Number")
}
// Adding "Clear Row" button for each book line
const container = document.querySelector('#myTable');

// Click handler for entire Table
container.addEventListener('click', function (e) {
// But only run for elements that have an alert-button class
    $( ".alert-button" ).click(function() {
      $(this).closest('tr').remove()
    });
});


//Add line for each book ISBN input
function addBookTable(bookName){
  var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
  // Insert a row at the end of table
  var newRow = tbodyRef.insertRow();
  
  // Insert a cell at the end of the row
  var bookCell = newRow.insertCell();
  var pageCell = newRow.insertCell();
  var clearCell = newRow.insertCell();

  // Append book cell
  var book = document.createElement('input');
  book.classList.add('form-control')
  book.classList.add('bookwidth')
  book.setAttribute("value", bookName);
  bookCell.appendChild(book);

  // Create page counting input
  var page = document.createElement('input');
  page.classList.add('form-control')
  page.classList.add('page')
  pageCell.appendChild(page);

  // Create Clear Button 
  var btn = document.createElement('button');
  btn.classList.add('alert-button')
  btn.innerText = 'Clear Row';
  clearCell.appendChild(btn);

  // Save title into storage
  save_book_data(bookName)
}



//Load data
if (localStorage.getItem("table_data") != null) load_data()

  //Update Table
  $('tbody').on("DOMSubtreeModified", function() {save_data()});
  $('tbody').on('change', '.form-control', function() {save_data()});
  //Save data
  function save_data(){
    let table_data = []
    $('.form-control').each(function() { table_data.push( $(this).val() )});
    localStorage.setItem('table_data', JSON.stringify(table_data));
}


//Load Data
 function load_data(){
    let table_data = JSON.parse(localStorage.getItem('table_data'));
    for (i = 0; i < (table_data.length); i +=2) {

      var tbodyRef = document.getElementById('myTable').getElementsByTagName('tbody')[0];
      // Insert a row at the end of table
      var newRow = tbodyRef.insertRow();
      
      // Insert a cell at the end of the row
      var bookCell = newRow.insertCell();
      var pageCell = newRow.insertCell();
      var clearCell = newRow.insertCell();

      // Append book cell
      var book = document.createElement('input');
      book.classList.add('form-control')
      book.classList.add('bookwidth')
      book.setAttribute("value", table_data[i]);
      bookCell.appendChild(book);

      // Create page counting input
      var page = document.createElement('input');
      page.classList.add('form-control')
      page.classList.add('page')
      page.setAttribute("value", table_data[i+1]);
      pageCell.appendChild(page);

      // Create Clear Button 
      var btn = document.createElement('button');
      btn.classList.add('alert-button')
      btn.innerText = 'Clear Row';
      clearCell.appendChild(btn);
    }
}





// https://stackoverflow.com/questions/51589137/how-to-save-table-content-permanently