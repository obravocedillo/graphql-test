import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useMainProvider } from '../../context/MainProvider';
import './Home.css';

const GET_ALL_BOOKS = gql`
  query {
    getAllBooks {
      name
      author
      year
    }
  }
`;

function Home() {
  const { loading, data } = useQuery(GET_ALL_BOOKS);
  const { name } = useMainProvider();
  if (loading) return <h1>Loading</h1>;
  return (
    <div>
      <h1>Hello {name}</h1>
      {data.getAllBooks.map((singleBook) => {
        return <h2 key={singleBook.name}>{singleBook.name}</h2>;
      })}
    </div>
  );
}

export default Home;
