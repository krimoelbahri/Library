const booksContainer= document.getElementById('booksContainer');
document.getElementById('add').addEventListener('click', function(){
    document.querySelector(".formContainer").style.display ="block"; 
});
document.getElementById('close').addEventListener('click', function(){
    document.querySelector(".formContainer").style.display ="none"; 
});

let myLibrary= [];

const book = function(title, author, pages , read){
    this.title= title;
    this.author= author;
    this.pages= pages;
    this.read= read;
}

const addBookToLibrary= function(e) {
    e.preventDefault();
    document.querySelector(".formContainer").style.display ="none";
    let title = document.getElementById('title').value;
    console.log(title);
    let author = document.getElementById('author').value;
    console.log(author);
    let pages= document.getElementById('pages').value;
    console.log(pages);
    objName = new book(`${title}`,`${author}`,`${pages}`, 'Not read yet' );
    removeCards();
    myLibrary.push(objName);
    bookCardGenerator();
}
document.getElementById('myForm').addEventListener('submit', addBookToLibrary );
const removeCards= function(){
    for(i=0; i<myLibrary.length;i++){
        cardstoremove= document.getElementById(`bookCard${i}`);
        booksContainer.removeChild(cardstoremove);
    }
}
const bookCardGenerator= function(){
    if(myLibrary.length==0){
        return;
    }
    //creating the card 
  for  (let i = 0 ; i<myLibrary.length ; i++){
    bookCard= document.createElement('div');
    bookCard.classList.add('bookCard');
    bookCard.setAttribute('id',`bookCard${i}`);
    booksContainer.appendChild(bookCard);
    // title of the book
    cardTitle= document.createElement('h1');
    cardTitle.classList.add('cardTitle');
    bookCard.appendChild(cardTitle);
    cardTitle.innerHTML= myLibrary[i].title;
    // author of the book
    cardAuthor= document.createElement('h2');
    cardAuthor.classList.add('cardAuthor');
    bookCard.appendChild(cardAuthor);
    cardAuthor.innerHTML= myLibrary[i].author;
    //pages of the book
    cardPages= document.createElement('h3');
    cardPages.classList.add('cardPages');
    bookCard.appendChild(cardPages);
    cardPages.innerHTML= myLibrary[i].pages;
    //card footer
    cardFooter= document.createElement('div');
    cardFooter.classList.add('cardFooter');
    bookCard.appendChild(cardFooter);
    //remove button
    cardRemove= document.createElement('button');
    cardRemove.classList.add('cardRemove');
    cardRemove.setAttribute('data-index',`${i}`);
    cardFooter.appendChild(cardRemove);
    cardRemove.addEventListener('click', removeBookFromLibrary);
    cardRemove.innerHTML= "Remove";
    //read button
    readButton= document.createElement('button');
    readButton.classList.add('readButton');
    cardFooter.appendChild(readButton);
    readButton.addEventListener('click', bookRead);
    readButton.innerHTML= "read";
    }
}
const removeBookFromLibrary = function(e){
    let j = e.target.dataset.index;
    removeCards();
    myLibrary.splice(j,1);
    bookCardGenerator();
}
const bookRead = function(){
    console.log('heyagain');
}


bookCardGenerator();