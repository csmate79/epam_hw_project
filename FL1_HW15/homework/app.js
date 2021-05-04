const root = document.getElementById('root');

function view() {
    removeAllChildNodes(root);
    separateWindow();
    load();
    leftDiv();
    clickEdit();
    clickOnBook();
}
view();

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function load() {
    let eventsFired = localStorage.getItem('fired');
    let newBooks = retrievedObject();
    if (eventsFired !== '1'){
        //books is from books.js. but i can't solve the eslint error...
        // eslint-disable-next-line no-undef
        localStorage.setItem('books', JSON.stringify(books));
        localStorage.setItem('fired', '1');
    }
    
    const idFromUrl = /\d+/;
    const hashtagInUrl = /(#)(\w+)/g;
    const locationId = window.location.search;
    const locationString = window.location.href;
    let resultId = parseInt(locationId.match(idFromUrl));
    let resultString = locationString.match(hashtagInUrl);
    console.log(resultString);
    
    if (newBooks !== null) {
        for (let i = 0; i < newBooks.length; i++) {
            console.log(newBooks[i].id);
            if (newBooks[i].id === resultId && resultString[0] === '#edit') {
                rightEdit(newBooks[i].title, newBooks[i].author, newBooks[i].image, newBooks[i].plot, newBooks[i].id);
            }
            if (newBooks[i].id === resultId && resultString[0] === '#preview') {
                rightPreview(newBooks[i].title, newBooks[i].author, newBooks[i].image, newBooks[i].plot);
            }
        }
        if (resultString !== null) {
            if (resultString[0] === '#add') {
                rightAdd();
            }
        }
    }
}

function separateWindow() {
    const leftDiv = document.createElement('div');
    leftDiv.classList.add('left-div');
    const rightDiv = document.createElement('div');
    rightDiv.classList.add('right-div');
    root.appendChild(leftDiv);
    root.appendChild(rightDiv);
}

function leftDiv() {
    let newBooks = retrievedObject();
    for (let i = 0; i < newBooks.length; i++) {
        if (newBooks[i].title) {
            console.log(newBooks[i].title);
            showBooks(newBooks[i]);
        }
    }
    addButton();
}

function showBooks(el) {
    const leftDiv = document.getElementsByClassName('left-div')[0];
    const newDiv = document.createElement('div');
    newDiv.classList.add('book-list');
    leftDiv.appendChild(newDiv);
    
    let book = document.createElement('p');
    book.classList.add('book');
    book.setAttribute('id', el.id);
    book.innerHTML = el.title;
    
    let icon = document.createElement('button');
    icon.innerHTML = 'Edit';
    newDiv.appendChild(book);
    newDiv.appendChild(icon);
}

function rightPreview(title, auth, img, pl) {
    const rightDiv = document.getElementsByClassName('right-div')[0];
    const newDiv = document.createElement('div');
    newDiv.classList.add('container');
    let bookName, author, image, plot;
    rightDiv.appendChild(newDiv);
    bookName = document.createElement('h1');
    bookName.innerHTML = title;
    newDiv.appendChild(bookName);
    author = document.createElement('h3');
    author.innerHTML = auth;
    newDiv.appendChild(author);
    image = document.createElement('img');
    image.src = img;
    newDiv.appendChild(image);
    plot = document.createElement('p');
    plot.setAttribute('id', 'plot');
    plot.innerHTML = pl;
    newDiv.appendChild(plot);
}

function rightEdit(title, auth, img, pl, id) {
    let newBooks = retrievedObject();
    let books = document.getElementsByClassName('book');
    const rightDiv = document.getElementsByClassName('right-div')[0];
    const newDiv = document.createElement('div');
    newDiv.classList.add('input-container');
    const buttonDiv = document.createElement('div');
    rightDiv.appendChild(newDiv);
    rightDiv.appendChild(buttonDiv);
    const titleLable = document.createElement('label');
    titleLable.innerHTML = 'Title:';
    const authorLable = document.createElement('label');
    authorLable.innerHTML = 'Author:';
    const imgLable = document.createElement('label');
    imgLable.innerHTML = 'Image link:'
    const plotLable = document.createElement('label');
    plotLable.innerHTML = 'Plot:';
    
    console.log(title + 's');
    console.log(id);
    
    let titleInput = document.createElement('input');
    titleInput.setAttribute('id', 'title-input');
    titleInput.setAttribute('value', title);
    newDiv.appendChild(titleLable);
    newDiv.appendChild(titleInput);
    
    let authorInput = document.createElement('input');
    authorInput.setAttribute('id', 'author-input');
    authorInput.setAttribute('value', auth);
    newDiv.appendChild(authorLable);
    newDiv.appendChild(authorInput);
    
    let imgInput = document.createElement('input');
    imgInput.setAttribute('id', 'img-input');
    imgInput.setAttribute('value', img);
    newDiv.appendChild(imgLable);
    newDiv.appendChild(imgInput);
    
    let plotInput = document.createElement('input');
    plotInput.setAttribute('id', 'plot-input');
    plotInput.setAttribute('value', pl);
    newDiv.appendChild(plotLable);
    newDiv.appendChild(plotInput);
    
    const cancel = document.createElement('button');
    cancel.setAttribute('id', 'cance');
    cancel.innerHTML = 'Cancel';
    buttonDiv.appendChild(cancel);
    
    const save = document.createElement('button');
    save.setAttribute('id', 'save');
    save.innerHTML = 'Save';
    buttonDiv.appendChild(save);
    
    cancel.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        modal.style.display = 'flex';

        yesBtn.addEventListener('click', () => {
            location.href = document.referrer;
        });
        noBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        })
    })
    
    save.addEventListener('click', () => {
        for (let i = 0; i < newBooks.length; i++) {
            if (parseInt(books[i].id) === id) {
                console.log('sas');
                newBooks[i].title = titleInput.value;
                newBooks[i].author = authorInput.value;
                newBooks[i].image = imgInput.value;
                newBooks[i].plot = plotInput.value;
                saveToLocal(newBooks);
                    location.href = 'index.html?id=' + id + '#preview';
                
            }
        }
        view();
        setTimeout(() => {
            alert('Book successfully updated');
        // eslint-disable-next-line no-magic-numbers
        }, 200);
    })
}

function clickEdit() {
    const rightDiv = document.getElementsByClassName('right-div')[0];
    let newBooks = retrievedObject();
    const editButtons = document.getElementsByTagName('button');
    for (let i = 0; i < newBooks.length; i++) {
        editButtons[i].addEventListener('click', () => {
            if (newBooks[i].title === editButtons[i].parentElement.firstChild.innerHTML) {
                window.location = 'index.html?id=' + newBooks[i].id + '#edit';
                removeAllChildNodes(rightDiv);
                rightEdit(newBooks[i].title, newBooks[i].author, newBooks[i].image, newBooks[i].plot, newBooks[i].id);
            }
        })
    }
}

function clickOnBook() {
    const rightDiv = document.getElementsByClassName('right-div')[0];
    let newBooks = retrievedObject();
    let books = document.getElementsByClassName('book');
    for (let i = 0; i < books.length; i++) {
        books[i].addEventListener('click', () => {
            window.location = 'index.html?id=' + newBooks[i].id + '#preview';
            removeAllChildNodes(rightDiv);
            rightPreview(newBooks[i].title, newBooks[i].author, newBooks[i].image, newBooks[i].plot);
        })
    }
}

function saveToLocal(el) {
    localStorage.setItem('books', JSON.stringify(el));
}

function retrievedObject() {
    let retrievedObject = localStorage.getItem('books');
    let newBooks = JSON.parse(retrievedObject);
    return newBooks;
}

function rightAdd() {
    const rightDiv = document.getElementsByClassName('right-div')[0];
    const newDiv = document.createElement('div');
    newDiv.classList.add('input-container');
    const buttonDiv = document.createElement('div');
    const titleLable = document.createElement('label');
    titleLable.innerHTML = 'Title:';
    const authorLable = document.createElement('label');
    authorLable.innerHTML = 'Author:';
    const imgLable = document.createElement('label');
    imgLable.innerHTML = 'Image link:'
    const plotLable = document.createElement('label');
    plotLable.innerHTML = 'Plot:';
    
    let cancelBtn = document.createElement('button');
    cancelBtn.innerHTML = 'Cancel';
    buttonDiv.appendChild(cancelBtn);
    
    let saveBtn = document.createElement('button');
    saveBtn.innerHTML = 'Save';
    buttonDiv.appendChild(saveBtn);
    
    rightDiv.appendChild(newDiv);
    
    let titleInput = document.createElement('input');
    newDiv.appendChild(titleLable);
    newDiv.appendChild(titleInput);
    
    let authorInput = document.createElement('input');
    newDiv.appendChild(authorLable);
    newDiv.appendChild(authorInput);
    
    let imgInput = document.createElement('input');
    newDiv.appendChild(imgLable);
    newDiv.appendChild(imgInput);
    
    let plotInput = document.createElement('input');
    newDiv.appendChild(plotLable);
    newDiv.appendChild(plotInput);
    
    rightDiv.appendChild(buttonDiv);
    
    cancelBtn.addEventListener('click', () => {
        removeAllChildNodes(rightDiv);
    })
    
    saveBtn.addEventListener('click', () => {
        const newBooks = retrievedObject();
        newBooks.push({id: newBooks.length+1, title: titleInput.value,
            author: authorInput.value,image: imgInput.value, 
            plot: plotInput.value});
            saveToLocal(newBooks);
            view();
    })
}
    
function addButton() {
    let newBooks = retrievedObject();
    const leftDiv = document.getElementsByClassName('left-div')[0];
    const rightDiv = document.getElementsByClassName('right-div')[0];
    const addButton = document.createElement('div');
    addButton.innerHTML = 'Add book';
    addButton.setAttribute('id', 'add-book');
    leftDiv.appendChild(addButton);
    
    addButton.addEventListener('click', () => {
        removeAllChildNodes(rightDiv);
        rightAdd();
        console.log(newBooks.length);
        window.location = 'index.html#add';
    })
}

function createModal() {
    const rightDiv = document.getElementsByClassName('right-div')[0];
    const modal = document.createElement('div');
    const content = document.createElement('div');
    content.classList.add('content');
    modal.setAttribute('id', 'modal');
    modal.appendChild(content);

    const btnDiv = document.createElement('div');

    const text = document.createElement('p');
    
    text.innerHTML = 'Discard changes?';
    content.appendChild(text);
    content.appendChild(btnDiv);

    const yesBtn = document.createElement('button');
    yesBtn.setAttribute('id', 'yes-btn');
    yesBtn.innerHTML = 'Yes';
    btnDiv.appendChild(yesBtn);

    const noBtn = document.createElement('button');
    noBtn.setAttribute('id', 'no-btn');
    noBtn.innerHTML = 'No';
    btnDiv.appendChild(noBtn);
    rightDiv.appendChild(modal);
}
createModal();
