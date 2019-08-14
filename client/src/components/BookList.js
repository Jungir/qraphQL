import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
//beware 

function BookList (){
    const { loading, error, data } = useQuery(gql`
        {
            books{
                name
                id
            }
        }
    `);
    console.log(data);
    return (
        <div>
            <ul id="book-list">
                <li>Book name</li>
            </ul>
        </div>
    )
    
}
export default BookList;