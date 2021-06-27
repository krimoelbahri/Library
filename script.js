const booksContainer= document.getElementById("booksContainer");
const add= document.getElementById("add");
const formContainer=  document.querySelector(".formContainer");
const showHideForm= function(){
	formContainer.classList.toggle("on");
	if(formContainer.className == ("formContainer on")){
		formContainer.style.display ="flex";
	}else{
		formContainer.style.display ="none";
	}
};
const rotateAddButton= function(){
	add.classList.toggle("on");
   
	if(add.className == ("on")){
		add.style.transform ="rotate(45deg)";
	}else{
		add.style.transform ="rotate(0deg)";
	}
};
const resetForm= function(){
	document.getElementById("title").value = "";
	document.getElementById("author").value = "";
	document.getElementById("pages").value = "";
};
add.addEventListener("click", function(){
	resetForm();
	showHideForm();
	rotateAddButton();
});

let myLibrary=JSON.parse(localStorage.getItem("library")) || [
	{
		title: "The Hobbit1",
		author: "John Ronald Reuel Tolkien",
		pages: "288",
		img:"images/the hobbit.jpeg",
		read: false,
	},
	{
		title: "The Alchemist2",
		author: "Paulo Coelho",
		pages: "195",
		img:"images/the alchemist.jpeg",
		read: false,
	},
	{
		title: "The Hobbit3",
		author: "John Ronald Reuel Tolkien",
		pages: "288",
		img:"images/the hobbit.jpeg",
		read: false,
	},
	{
		title: "The Alchemist4",
		author: "Paulo Coelho",
		pages: "195",
		img:"images/the alchemist.jpeg",
		read: false,
	},
	{
		title: "The Hobbit5",
		author: "John Ronald Reuel Tolkien",
		pages: "288",
		img:"images/the hobbit.jpeg",
		read: false,
	},
	{
		title: "The Alchemist6",
		author: "Paulo Coelho",
		pages: "195",
		img:"images/the alchemist.jpeg",
		read: false,
	},
	{
		title: "The Hobbit7",
		author: "John Ronald Reuel Tolkien",
		pages: "288",
		img:"images/the hobbit.jpeg",
		read: false,
	},
	{
		title: "The Alchemist8",
		author: "Paulo Coelho",
		pages: "195",
		img:"images/the alchemist.jpeg",
		read: false,
	}
];

const book = function(title, author, pages,img , read){
	this.title= title;
	this.author= author;
	this.pages= pages;
	this.img=img;
	this.read= read;
};
const checkRead= function(){
	let read= document.getElementById("read");
	let notRead= document.getElementById("notRead");
	if(read.checked){
		return true;
	}
	if(notRead.checked){
		return false;
	}
};
const newBook= function(){
	let title = document.getElementById("title").value;
	let author = document.getElementById("author").value;
	let pages= document.getElementById("pages").value;
	let img=document.getElementById("img").value;
	if(!img){img="img holder";}
	let newBook = new book(`${title}`,`${author}`,`${pages}`,`${img}`,checkRead() );
	return newBook;
};
const removeCards= function(){
	for(let i=0; i<myLibrary.length;i++){
		let cardsToRemove= document.getElementById(`bookCard${i}`);
		booksContainer.removeChild(cardsToRemove);
	}
};
const addBookToLibrary= function(e) {
	e.preventDefault();
	showHideForm();
	rotateAddButton();
	removeCards();
	myLibrary.push(newBook());
	localStorage.setItem("library",JSON.stringify(myLibrary));
	bookCardGenerator();
};
document.getElementById("myForm").addEventListener("submit", addBookToLibrary );

const removeBookFromLibrary = function(e){
	let j = e.target.dataset.index;
	console.log(j);
	removeCards();
	myLibrary.splice(j,1);
	console.log(myLibrary);
	bookCardGenerator();
	//localStorage.setItem("library",JSON.stringify(myLibrary));
};
const toggleRead= function(e){
	let j = e.target.dataset.index;
	if(myLibrary[j].read){
		myLibrary[j].read= false;
	}else{
		myLibrary[j].read= true;
	}
	localStorage.setItem("library",JSON.stringify(myLibrary));
	removeCards();
	bookCardGenerator();
};
const readButtonValue = function(element){
	let j = element.dataset.index;    
	if(myLibrary[j].read){
		element.innerHTML= "read";
	}else{
		element.innerHTML= "Not read";
	}
};
const getImg= async function(img,j) {
	const response= await fetch(myLibrary[j].img, {mode:"cors"});
	if(response.status===200){
		img.src=response.url;
	}else{
		img.src="images/book-placeholder.jpg";
	}
};
const bookCardGenerator= function(){
	if(myLibrary.length==0){
		return;
	}
	//creating the card 
	for  (let i = 0 ; i<myLibrary.length ; i++){
		let bookCard= document.createElement("div");
		let cardTitle= document.createElement("h2");
		let bookCover= document.createElement("div");
		let bookImg= document.createElement("img");
		let cardAuthor= document.createElement("h3");
		let cardPages= document.createElement("h4");
		let cardFooter= document.createElement("div");
		let cardRemove= document.createElement("div");
		let readButton= document.createElement("button");
		// the Card container
		bookCard.classList.add("bookCard");
		bookCard.setAttribute("id",`bookCard${i}`);
		booksContainer.appendChild(bookCard);
		// title of the book
		bookCard.appendChild(cardTitle);
		cardTitle.innerHTML= `Book Title : ${myLibrary[i].title}`;
		//book Cover
		bookCard.appendChild(bookCover);
		bookCover.appendChild(bookImg);
		bookCover.classList.add("bookCover");
		bookImg.classList.add("bookImg");
		getImg(bookImg,i);
		// author of the book
		bookCard.appendChild(cardAuthor);
		cardAuthor.innerHTML= `By : ${myLibrary[i].author}`;
		//pages of the book
		bookCard.appendChild(cardPages);
		cardPages.innerHTML= `Number of pages: ${myLibrary[i].pages}`;

		//card footer
		cardFooter.classList.add("cardFooter");
		bookCard.appendChild(cardFooter);
		//remove button
		cardRemove.classList.add("cardRemove");
		cardFooter.appendChild(cardRemove);
		cardRemove.addEventListener("click", removeBookFromLibrary);
		cardRemove.innerHTML= `<img id="delete" data-index="${i}" src="images/delete.png"  alt="Del">
        `;
		//read button
		readButton.setAttribute("id",`readButton${i}`);
		readButton.setAttribute("data-index",`${i}`);
		cardFooter.appendChild(readButton);
		readButtonValue(readButton);
		readButton.addEventListener("click", toggleRead);
	}
};

bookCardGenerator();