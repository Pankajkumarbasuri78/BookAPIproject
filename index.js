//set up express project
const { request, response } = require("express");
const express =require("express");

//importing of Database
const database = require("./database");

//initialisation
const booky = express();

//configuration 
booky.use(express.json());


/*
Route           /
Description     Get all books
Access          public
Parameter       none
Methods         Get
*/

booky.get("/",(request,response) => {
    return response.json({books: database.books});
});


/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/


booky.get("/is/:isbn", (request,response) => {
    const getSpecificBook = database.books.filter(
        (book) => book.ISBN === request.params.isbn
        );
        if(getSpecificBook.length === 0){
            return response.json({Error:`No book found for the ISBN of ${request.params.isbn}`});
        }

    return response.json({book: getSpecificBook});
});


/*
Route           /c
Description     to get list of book based on category
Access          public
Parameter       category
Methods         Get
*/


booky.get("/c/:category",(request,response) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(request.params.category)
        );
        if(getSpecificBook.length === 0){
            return response.json({Error:`No book found for the category of ${request.params.category}`});
        }

    return response.json({book: getSpecificBook});
});


/* 3rd API detail
Route             /l
Description       Get specific books based on language
Acess             public
Parameter         language
Methods           Get
*/
booky.get("/l/:language", (request,response) => {
    const  getSpecificBook = database.books.filter(
        (book) => book.language === request.params.language
        );
        if(getSpecificBook.length === 0){
            return response.json({Error:`No book found for the language of ${request.params.language}`});
        }

    return response.json({book: getSpecificBook});
});


/*
Route           /author
Description     to get all authors
Access          public
Parameter       none
Methods         Get
*/

booky.get("/author", (request,response) => {
    return response.json({authors: database.author});

});


/*
Route           /author/id
Description     to get specific authors
Access          public
Parameter       id
Methods         Get
*/

booky.get("/author/id/:id", (request,response) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.id === parseInt(request.params.id)
    );
    if(getSpecificAuthor === 0){
        return response.json({authors: `No authors founds of id ${request.params.id}`});
    }
    
    return response.json({authors: getSpecificAuthor});
});

/*
Route           /author/book
Description     to get list of authors based on books
Access          public
Parameter       isbn
Methods         Get
*/

booky.get("/author/book/:isbn", (request,response) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.books.includes(request.params.isbn)
        );
        if(getSpecificAuthor.length === 0){
            return response.json({Error:`No author found for the book of ${request.params.isbn}`});
        }

    return response.json({authors : getSpecificAuthor});

});


/*
Route           /publication
Description     to get all publication
Access          public
Parameter       none
Methods         Get
*/

booky.get("/publication", (request,response) => {
    return response.json({publications: database.publication});

});

/*
Route           /publication
Description     to get specific publication
Access          public
Parameter       id
Methods         Get
*/

booky.get("/publication/:id", (request,response) => {
    const getSpecificPublication = database.publication.filter(
        (publications) => publications.id === parseInt(request.params.id)
    );
    if(getSpecificPublication.length === 0){
        return response.json({Error:`No publicatio found for the book of ${request.params.id}`});
    }

    return response.json({publications : getSpecificPublication});
});


/*
Route           /publication/book
Description     to get list of publication based of book
Access          public
Parameter       isbn
Methods         Get
*/

booky.get("/publication/book/:isbn", (request,response) => {
    const getSpecificPublication = database.publication.filter(
        (publications) => publications.books.includes(request.params.isbn)
    );
    if(getSpecificPublication.length === 0){
        return response.json({Error:`No publication found for the book of isbn  ${request.params.isbn}`});
    }

    return response.json({publications : getSpecificPublication});
});


/*
Route           /book/add
Description     Add new book
Access          public
Parameter       none
Methods         POST
*/

booky.post("/book/add", (request,response) =>{
    //const newBook = request.body.newBook;       use destructure ES6 property because both newBook variable are same
  
    const {newBook} = request.body;      //creating a new constant object and utilising it directly

    database.books.push(newBook);
    return response.json({books : database.books});

});




/*
Route           /author/add
Description     Add new author
Access          public
Parameter       none
Methods         POST
*/

booky.post("/author/add", (request,response) => {
    const {newAuthor} = request.body;      //creating a new constant object and utilising it directly

    database.author.push(newAuthor);
    return response.json({authors : database.author});
});


/*
Route           /publication/add
Description     Add new publications 
Access          public
Parameter       none
Methods         POST
*/

booky.post("/publication/add", (request,response) => {
    const {newPublication} = request.body;

    database.publication.push(newPublication);
    return response.json({publications: database.publication});
});

/*
Route           /book/update/title
Description     Update book title 
Access          public
Parameter       isbn
Methods         PUT
*/

booky.put("/book/update/title/:isbn", (request,response) =>{
    
    //forEach  =>it will update the main array directly  therefore this is better
    database.books.forEach((book) => {
        if(book.ISBN === request.params.isbn){
            book.title = request.body.newBookTitle;
            return;
        }

    });

    return response.json({books: database.books});

    //map  =>it will update the main array by copying it makes new array

});


/*
Route           /book/update/author
Description     update/Add new author for a book
Access          public
Parameter       isbn, authorId
Methods         PUT
*/

booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    // update book database
  
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        return book.author.push(parseInt(req.params.authorId));
      }
    });
  
    // update author database
  
    database.author.forEach((author) => {
      if (author.id === parseInt(req.params.authorId))
        return author.books.push(req.params.isbn);
    });
  
    return res.json({ books: database.books, author: database.author });
  });


  /*
Route           /author/update/name
Description     Update author name
Access          public
Parameter       id,Name
Methods         PUT
*/

booky.put("/author/update/name/:id/:Name", (request,response) => {
    database.author.forEach((author) =>{
        if(author.id === parseInt(request.params.id)){
            author.name = request.params.Name;
        }
    });
    return response.json({authors: database.author});
});



/*
Route           /publication/update/name
Description     Update the publication name
Access          public
Parameter       id
Methods         PUT
*/

booky.put("/publication/update/name/:id", (request,response) => {
    database.publication.forEach((publications) => {
        if(publications.id === parseInt(request.params.id)){
            publications.name = request.body.newName;
            return;

        }
    });
    return response.json({publications: database.publication});
});



/*
Route           /publication/update/book
Description     Update/Add new book to publications
Access          public
Parameter       isbn
Methods         PUT
*/


booky.put("/publication/update/book/:isbn", (request,response) => {
    // update the publications database
    database.publication.forEach((publications) => {
        if(publications.id === request.body.pubId){
            return publications.books.push(request.params.isbn);
        }
    });

    //upadate the book database
    database.books.forEach((book) => {
        if(book.ISBN === request.params.isbn){
            book.publication =request.body.pubId;
            return; //what is the need of this return
        }
    });
    return response.json({books: database.books, publications: database.publication, 
        message:"successfully updated publication"});
});

booky.listen(8080, () => console.log("Server is running!"));

//HTTP client ->helper to helps u to make http request