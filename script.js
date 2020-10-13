let myLibrary = [];

function acceptInput () {
    //set up and accept input values
    let name = document.getElementbyID('name');
    let author = document.getElementbyID('author');
    let pages = document.getElementbyID('pages');
    Book(name, author, pages);
}

//accept input from html with AddBooktoLibrary()
//convert input into compatible format and use Book() prototype to make it
//add book to myLibrary array
//create element on DOM to display book

function Book(name, author, pages, isRead) {
// the constructor...
    this.name = name
    this.author = author
    this.pages = pages
    this.isRead = isRead;
}

const newBook = new Book(name, author, pages, isRead);
myLibrary += newBook

function addBookToLibrary() {

}