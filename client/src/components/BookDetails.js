import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../Queries/BookQueries';

function BookDetails ({bookId}){
    const { loading, data } = useQuery(getBookQuery, {variables: {id: bookId}});
    const displayBookDetails = () => {
        const {book} = data;
        if(bookId === null){
            return (
                <div>No book selected...</div>
            )
        }else if (loading){
            return (
                <div>Getting the books from the server...</div>
            )
        }
        else if(book){
           return (
               <div>
                   <h2>{book.name}</h2>
                   <p>{book.genre}</p>
                   <p>{book.author.name}</p>
                   <p>All books by this author :</p>
                   <ul className="other-books">
                       {book.author.books.map(item => {
                           return <li key={item.id}>{item.name}</li>
                       })}
                   </ul>
               </div>
           )
       }
    }
    
    return (
        <div id="book-details">
            {displayBookDetails()}
        </div>
    );
    
};
export default BookDetails;