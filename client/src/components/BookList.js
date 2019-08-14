import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
//beware 
export const BookQuery = gql`
{
    books{
        name
        id
    }
}
`
function BookList (){
    
    const { loading, error, data } = useQuery(BookQuery);
    if (loading) return <p>Getting the books...</p>;
    if (error) return <p>Could not fetch the data</p>;
    const displayBooks = ()=> (
        data.books.map(book => {
            return <li key={book.id}>{book.name}</li>
        })
    );
  
    
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    );
    
};
export default BookList;