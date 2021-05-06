import React, { useContext, createContext, useState } from 'react';

const axios = require('axios');

const initialContextValue = {
  fullName: 'Oliver',
  books: [],
};

const MainContext = createContext(initialContextValue);

function useMainProvider() {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('Context is not initialized');
  }
  return context;
}

function MainProvider({ children }) {
  const [fullName] = useState('Oliver');
  const [books, setBooks] = useState([]);
  const getAllBooksAxios = async () => {
    try {
      const postGetAllBooks = await axios.post(
        'http://localhost:3002/graphql',
        {
          query: `
            query {
              getAllBooks {
                name
                author
                year
              }
            }
            `,
        },
        {}
      );
      setBooks(postGetAllBooks.data.data.getAllBooks);
      return postGetAllBooks.data.data.getAllBooks;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  const addNewBook = async (name, author, year) => {
    const postAddNewBook = await axios.post(
      'http://localhost:3002/graphql',
      {
        query: `
          mutation saveBook($name:String!, $author:String!, $year:Int!) {
            saveBook(name:$name, author:$author, year:$year) { 
              name,
              author,
              year
            }
          }
        `,
        variables: {
          name,
          author,
          year: parseInt(year, 10),
        },
      },
      {}
    );
    const currentBooks = [...books];
    currentBooks.push(postAddNewBook.data.data.saveBook);
    setBooks(currentBooks);
    return postAddNewBook.data.data.saveBook;
  };
  return (
    <MainContext.Provider value={{ fullName, books, getAllBooksAxios, addNewBook }}>
      {children}
    </MainContext.Provider>
  );
}

export default MainProvider;
export { useMainProvider };
