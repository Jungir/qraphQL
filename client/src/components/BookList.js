import React,{useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { BookQuery } from '../Queries/BookQueries';
import BookDetails from './BookDetails';


function BookList (){
   
    const { loading, error, data } = useQuery(BookQuery);
    const [selected, setSelected] = useState(null);
    if (loading) return <p>Getting the books...</p>;
    if (error) return <p>Could not fetch the data</p>;
    const displayBooks = ()=> (
        data.books.map(book => {
            return <li onClick={(e)=> setSelected(book.id)} key={book.id}>{book.name}</li>
        })
    );
  
    
    return (
        <div>
            <ul id="book-list">
                {displayBooks()}
            </ul>
            <BookDetails bookId = {selected}/>
        </div>
    );
    
};
export default BookList;