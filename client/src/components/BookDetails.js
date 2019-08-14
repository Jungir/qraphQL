import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../Queries/BookQueries';

function BookDetails (){
    const { loading, data } = useQuery(getBookQuery);
    console.log(loading, data);
    
    return (
        <div id="book-details">
            <p>output book detail here</p>
        </div>
    );
    
};
export default BookDetails;