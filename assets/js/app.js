// Book Constructor
function Book(bookName, authorName, issn){
    this.bookName = bookName;
    this.authorName = authorName;
    this.issn = issn;
}

// UI Constructor
function UI(){}
// UI Prototype - create list
UI.prototype.createBookList = (book)=>{
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

UI.prototype.deleteList = (icon)=>{
    icon.parentElement.parentElement.remove();
}

// UI Prototype - clear fields
UI.prototype.clearfields = ()=>{
    document.querySelector('#book-name').value = '';
    document.querySelector('#author-name').value = '';
    document.querySelector('#issn').value = '';
}

// UI Prototype - show notification
UI.prototype.getNotification = (classAlert, message)=>{
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
        ui.getNotification('alert-success', 'Book deleted successfully');
    }
});
