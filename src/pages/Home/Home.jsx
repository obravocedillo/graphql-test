import React, { useEffect, useState } from 'react';
import { useMainProvider } from '../../context/MainProvider';
import './Home.css';

function Home() {
  const { fullName, books, getAllBooksAxios, addNewBook } = useMainProvider();
  const [nameBook, setNameBook] = useState('');
  const [authorBook, setAuthorBook] = useState('');
  const [yearBook, setYearBook] = useState(2021);
  useEffect(() => {
    if (books.length === 0) {
      getAllBooksAxios();
    }
    console.log(books);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books.length]);

  const addNewBookHandler = (event) => {
    event.preventDefault();
    addNewBook(nameBook, authorBook, yearBook);
  };

  const bookNameChangeHandler = (event) => {
    setNameBook(event.target.value);
  };
  const bookAuthorChangeHandler = (event) => {
    setAuthorBook(event.target.value);
  };
  const bookYearChangeHandler = (event) => {
    setYearBook(event.target.value);
  };
  if (books.length === 0) return <h1>Loading</h1>;
  return (
    <div className="home-main-container">
      <h1 className="home-title">
        Hello <strong>{fullName}</strong>
      </h1>
      <div className="books-container">
        {books.map((singleBook) => {
          return (
            <div key={singleBook.name} className="single-book">
              <h3 className="single-book-title">{singleBook.name}</h3>
              <p className="single-book-author">{singleBook.author}</p>
              <p className="single-book-year">{singleBook.year}</p>
            </div>
          );
        })}
      </div>

      <input
        placeholder="Book name"
        onChange={(e) => bookNameChangeHandler(e)}
        className="add-book-input"
      />
      <input
        placeholder="Book authro"
        onChange={(e) => bookAuthorChangeHandler(e)}
        className="add-book-input"
      />
      <input
        placeholder="Book year"
        type="number"
        onChange={(e) => bookYearChangeHandler(e)}
        className="add-book-input"
      />
      <button
        type="button"
        onClick={(e) => addNewBookHandler(e)}
        className="add-book-button"
      >
        Save book
      </button>
    </div>
  );
}

export default Home;
