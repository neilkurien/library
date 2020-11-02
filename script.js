const bookshelf = document.getElementById('bookshelf');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
let isReadInput;
const isReadInputValues = document.getElementsByName('isRead');

let myLibrary = [
    {title : "The Design of Everyday Things", author : "Don Norman", pages : 347, isRead : true},
    {title : "User Friendly", author : "Cliff Kuang", pages : 243, isRead : false}
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
        isReadInputValues[i].checked = false;
    }
}

function addBookToLibrary() {
    checkIsRead ();
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput);
    myLibrary.push(newBook);
    clearValues();
    updateLibrary();
}

function updateLibrary() {
    clearDisplay();

    //filter through all array elements
    myLibrary.forEach((Book, index) => {

        const bookCard = document.createElement('div');
        bookCard.setAttribute('data-index', index);
        bookCard.classList.add("book");
    
        const cardTitle = document.createElement('h1');
        cardTitle.classList.add("title");
        cardTitle.innerHTML = Book.title;
        bookCard.appendChild(cardTitle);
        
        const cardAuthor = document.createElement('h3');
        cardAuthor.classList.add("author");
        cardAuthor.innerHTML = Book.author;
        bookCard.appendChild(cardAuthor);
        
        const cardPages = document.createElement('p');
        cardPages.classList.add("pages");
        cardPages.innerHTML = Book.pages;
        bookCard.appendChild(cardPages);
        
        const cardIsRead = document.createElement('button');
        cardIsRead.classList.add('toggleBtn');
        cardIsRead.addEventListener('onclick', toggleIsRead);
    
        //add different classes depending on isRead status
        if (Book.isRead == "true") {
            cardIsRead.classList.add("read");
            cardIsRead.innerHTML = "Finished";
        }
        else {
            //cardIsRead.classList.add("");
            cardIsRead.innerHTML = "Mark as Read";
        }
        bookCard.appendChild(cardIsRead);

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', deleteBook);
        bookCard.appendChild(deleteBtn);

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
    function toggleIsRead (e) {
        let index = e.target.parentNode.getAttribute('data-index');
        let btn = e.target;

        if (myLibrary[index].isRead) {
            myLibrary[index].isRead = false;
            console.log(myLibrary[index].isRead);
            btn.classList.remove("read");
            btn.innerHTML = "Mark as Read";
        }
        else {
            myLibrary[index].isRead = true;
            console.log(myLibrary[index].isRead);
            btn.classList.add("read");
            btn.innerHTML = "Finished";
        }
    }
    addBtnListeners();
}

function clearDisplay() {
    bookshelf.innerHTML = '';
}

function deleteBook (e) {
    let index = e.target.parentNode.getAttribute('data-index');
    console.log(index);
    myLibrary.splice(index, 1);
    updateLibrary();
}

//Event listener and function, toggle visiblity of Add New Book form
const plusCloseBtn = document.getElementById('plus-close-btn');
const addNewBookBtn = document.getElementById('add-new-book');
addNewBookBtn.addEventListener('click', openClose);
plusCloseBtn.addEventListener('click', openClose);

function openClose () {
    const btnSection = document.getElementById('button-section');
    const inputField = document.getElementById('input-field');

    console.log(plusCloseBtn.className.baseVal);
    
        /* if (plusCloseBtn.className.baseVal == "plus") {
            console.log('here');
            btnSection.style.display = "none";
            inputField.style.display = "flex";
            plusCloseBtn.setAttribute(class, 'close')
        } */
        if (plusCloseBtn.className.baseVal == "plus") {
            console.log('here');
            btnSection.style.display = "none";
            inputField.style.display = "flex";
            plusCloseBtn.classList.remove('plus');
            plusCloseBtn.classList.add('close');
        }
        else {
            btnSection.style.display = "flex";
            inputField.style.display = "none";
            plusCloseBtn.classList.remove('close');
            plusCloseBtn.classList.add('plus');
        }
}
//make New Book button that opens form, with close button