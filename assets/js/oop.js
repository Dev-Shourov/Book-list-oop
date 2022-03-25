// Book Class
class Book{
    constructor(bookName, authorName, issn){
        this.bookName = bookName;
        this.authorName = authorName;
        this.issn = issn; 
    }
}

// UI Class
class UI{
    constructor(){

    }
    createBookList = (book)=>{
        const list = document.querySelector('.add-row');
        // create table row
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.bookName}</td>
        <td>${book.authorName}</td>
        <td>${book.issn}</td>
        <td class="text-center">
            <i class="fas fa-trash-alt"></i>
        </td>
        `;
        list.appendChild(row);
    }

    deleteList = (icon)=>{
        icon.parentElement.parentElement.remove();
    }

    clearfields = ()=>{
        document.querySelector('#book-name').value = '';
        document.querySelector('#author-name').value = '';
        document.querySelector('#issn').value = '';
    }

    getNotification = (classAlert, message)=>{
        // create alert div
        const Adiv = document.createElement('div');
        Adiv.className = `alert ${classAlert} mt-2`;
        Adiv.appendChild(document.createTextNode(message));
        const card = document.querySelector('.app-card');
        const form = document.querySelector('#book-form');
        // add notification before form
        card.insertBefore(Adiv, form);
        // timeout
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// Local-Storage Class
class Store {
    static getLocalBooks = ()=>{
        let books;
        if (localStorage.getItem('books') == null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addLocalBooks = (bookInfo)=>{
        const books = Store.getLocalBooks();
        books.push(bookInfo);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static displayBooks = ()=>{
        const books = Store.getLocalBooks();
        books.forEach((book)=>{
            const ui = new UI();
            ui.createBookList(book);
        });
    }

    static delLocalBooks = (isbn)=>{
        const books = Store.getLocalBooks();
        books.forEach((book, index)=>{
            if(book.issn == isbn){
                books.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(books));
            }
        });
    }
}

// Load books form local storage
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// form even listner
document.querySelector('#book-form').addEventListener('submit', (e)=>{
    // get values
    const getBook = document.querySelector('#book-name').value,
          getAuthor = document.querySelector('#author-name').value,
          getIssn = document.querySelector('#issn').value;
    const bookList = new Book(getBook, getAuthor, getIssn);

    // create book list
    const ui = new UI();
    if (getBook === '' || getAuthor === '' || getIssn === '') {
        ui.getNotification('alert-danger', 'please insert valid information');
    } else {
        ui.createBookList(bookList);
        // add to local storage
        Store.addLocalBooks(bookList);
        // clear form fields
        ui.clearfields();
    }
    // prevent default form behaibour
    e.preventDefault();
});

// delete event listner
document.querySelector('.book-list-card').addEventListener('click', (e)=>{
    if(e.target.classList.contains('fa-trash-alt')){
        const ui = new UI();
        ui.deleteList(e.target);
        Store.delLocalBooks(e.target.parentElement.previousElementSibling.textContent);;
        ui.getNotification('alert-success', 'Book deleted successfully');
    }
});