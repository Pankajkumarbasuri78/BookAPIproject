const books = [   //Array Of Objects
    {             //data of 1 book
      ISBN: "12345Book",
      title: "Getting started with MERN",
      pubDate: "2021-07-07",
      language: "en",
      numPage: 250,
      author: [1, 2],
      publications: [1],
      category: ["tech", "programming", "education", "thriller"],
    },
  ];
  
  const author = [
    {
      id: 1,
      name: "Pankaj",
      books: ["12345Book","12345secondbook"],
    },
    { 
        id: 2, 
        name: "Elon Musk", 
        books: ["12345Book"] 
    },
  ];
  
  const publication = [
    {
      id: 1,
      name: "writex",
      books: ["12345Book"],
    },
    {
      id: 2,
      name: "pkb",
      books: [],
    },
  ];
  //exports this before u use this data 
  module.exports = { books, author, publication };//after this it allows to share this data