const bookshelf = document.getElementById('bookshelf');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
let isReadInput;
const isReadInputValues = document.getElementsByName('isRead');

let myLibrary = [
    {title : "Blood, Sweat, and Pixels", author : "Jason Schreier", pages : 304, isRead : "false"},
    {title : "Invisible Women", author : "Caroline Criado Perez", pages : 410, isRead : "false"},
    {title : "Plugged", author : "Eoin Colfer", pages : 256, isRead : "true"}
];

updateLibrary();

//Submit Button event listener
const submit = document.getElementById('submit');
submit.addEventListener('click', addBookToLibrary);

function Book(title, author, pages, isRead) {
// the constructor...
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead;
}

//isReadInputValues is an array, checks which is selected and returns only that value to isReadInput  
function checkIsRead () {
    for (const rb of isReadInputValues) {
        if (rb.checked) {
            isReadInput = rb.value;
        }
    }
    return isReadInput
}

function clearValues() {
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    //uncheck both radio buttons
    for (i = 0; i<isReadInputValues.length; i++) {
        isReadInputValues[i].checked = "false";
    }
}

function addBookToLibrary() {
    checkIsRead ();
    console.log(isReadInput);
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput);
    myLibrary.push(newBook);
    clearValues();
    updateLibrary();
    openClose();
    console.log(myLibrary);
}

function updateLibrary() {
    clearDisplay();

    //filter through all array elements
    myLibrary.forEach((Book, index) => {

        const bookCard = document.createElement('div');
        bookCard.setAttribute('data-index', index);
        bookCard.classList.add("book-container");

        const bookOutline = document.createElement('div');
        bookOutline.classList.add("book");

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = `<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><g class="bin" fill="black"><path d="M1.25 8.74999C1.25 9.43907 1.8106 9.99998 2.49999 9.99998H7.49999C8.18938 9.99998 8.74998 9.43907 8.74998 8.74999V2.5H1.25V8.74999Z"/><path d="M6.24999 0.624995V0H3.74999V0.624995H0.625V1.87499H9.37499V0.624995H6.24999Z"/></g></svg>`;
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', deleteBook);
        bookCard.appendChild(deleteBtn);

        const cardIsRead = document.createElement('button');
        cardIsRead.classList.add('toggleBtn');
        
        cardIsRead.innerHTML = `<svg width="12" height="9" viewBox="0 0 12 9" class="tick" fill="black" xmlns="http://www.w3.org/2000/svg"><path d="M0 4.88285L4.10933 9L12 1.11716L10.8672 0L4.10933 6.74996L1.11715 3.75782L0 4.88285Z"/></svg>`;

        //add different classes depending on isRead status
        if (Book.isRead == "true") {
            cardIsRead.classList.add("read");
            bookOutline.classList.add("greenOutline");
        }
        
        bookCard.appendChild(cardIsRead);
    
        const cardTitle = document.createElement('h1');
        cardTitle.classList.add("title");
        cardTitle.innerHTML = Book.title;
        bookOutline.appendChild(cardTitle);
        
        const row2 = document.createElement('div');
        row2.classList.add('row2');

        const cardAuthor = document.createElement('h3');
        cardAuthor.classList.add("author");
        cardAuthor.innerHTML = Book.author;
        row2.appendChild(cardAuthor);
        
        const cardPages = document.createElement('p');
        cardPages.classList.add("pages");
        cardPages.innerHTML = `${Book.pages} pages`;
        row2.appendChild(cardPages);
        
        bookOutline.appendChild(row2);

        bookCard.appendChild(bookOutline);

        bookshelf.appendChild(bookCard);
    });

    //add event listeners to every book's buttons
    function addBtnListeners () {
        const btns = document.querySelectorAll('.toggleBtn');
        btns.forEach(button => {
            button.addEventListener('click', toggleIsRead);
        });
    }

    //event listener function added to every book's button
    function toggleIsRead () {
        let index = this.parentNode.getAttribute('data-index');
        let btn = this;
        let cardOutline = this.nextSibling;

        if (myLibrary[index].isRead == "true") myLibrary[index].isRead == "false";
        else if (myLibrary[index].isRead == "false") myLibrary[index].isRead == "true";

        btn.classList.toggle("read");
        cardOutline.classList.toggle("greenOutline");
    }
    addBtnListeners();
}

function clearDisplay() {
    bookshelf.innerHTML = '';
}

function deleteBook (e) {
    let index = e.target.parentNode.getAttribute('data-index');
    myLibrary.splice(index, 1);
    updateLibrary();
}

//Event listener and function, toggle visiblity of Add New Book form
const plusCloseBtn = document.getElementById('plus-close-btn');
const addNewBookBtn = document.getElementById('add-new-book');
addNewBookBtn.addEventListener('click', openClose);
plusCloseBtn.addEventListener('click', openClose);

function openClose () {
    const inputField = document.getElementById('input-field');
    
        if (plusCloseBtn.className.baseVal == "plus") {
            addNewBookBtn.style.display = "none";
            inputField.style.display = "flex";
            plusCloseBtn.classList.remove('plus');
            plusCloseBtn.classList.add('close');
            plusCloseBtn.addEventListener('click', clearValues);
        }
        else {
            addNewBookBtn.style.display = "flex";
            inputField.style.display = "none";
            plusCloseBtn.classList.remove('close');
            plusCloseBtn.classList.add('plus');
        }
}

//When adding new book is cancelled, clear values
const closeBtn = document.getElementById('plus-close-btn');
closeBtn.addEventListener('click', clearValues);