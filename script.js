const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');
const isReadInputValues = document.getElementsByName('isRead');
let isReadInput;
const libraryTable = document.getElementById('library');

/* console.log(document.getElementsByName('isRead')); */

let myLibrary = [
    {title : "The Design of Everyday Things", author : "Don Norman", pages : 347, isRead : true},
    {title : "User Friendly", author : "Cliff Kuang", pages : 243, isRead : false}
];

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

function addBookToLibrary() {
    checkIsRead ();
    const newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput);
    myLibrary.push(newBook);
    updateLibrary();
}

function updateLibrary() {

    //filter through all array elements
    myLibrary.map(Book => {
        const libraryContainer = document.getElementById('library-cards');
        const libraryCards = document.createElement('div');
        libraryCards.classList.add("book");
    
        const cardTitle = document.createElement('h1');
        cardTitle.classList.add("title");
        cardTitle.innerHTML = Book.title;
        libraryCards.appendChild(cardTitle);
        
        const cardAuthor = document.createElement('h3');
        cardAuthor.classList.add("author");
        cardAuthor.innerHTML = Book.author;
        libraryCards.appendChild(cardAuthor);
        
        const cardPages = document.createElement('p');
        cardPages.classList.add("pages");
        cardPages.innerHTML = Book.pages;
        libraryCards.appendChild(cardPages);
        
        const cardIsRead = document.createElement('button');
        cardIsRead.setAttribute('id', 'mark-as-read');
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
        libraryCards.appendChild(cardIsRead);
        libraryContainer.appendChild(libraryCards);
    });
}

//event listener function for books mark-as-read button
function toggleIsRead () {
    if (this.isRead == "true") {
        this.isRead = "false";
        cardIsRead.classList.remove("read");
        cardIsRead.innerHTML = "Mark as Read";
    }
    else if (this.isRead == "false") {
        this.isRead = "true";
        cardIsRead.classList.add("read");
        cardIsRead.innerHTML = "Finished";
    }
    console.log("here");
}

//update library with new books, generated from the array