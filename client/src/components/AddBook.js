import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
//beware 

function AddBook (){
    const { loading, data } = useQuery(gql`
        {   
            authors{
                name
                id
            }
        }
    `);

    
    const displayAuthors = () => (
        loading ? 
            (<option disabled>Loading authors...</option> )
            : (data.authors.map(author => {
            return <option key={author.id} value={author.id}>{author.name}</option>})
            )
    );
  
    
    return (
        <form id="add-book">

            <div className="field">
            <label>Book name:</label>
            <input type="text"/>
            </div>

            <div className="field">
            <label>Genre:</label>
            <input type="text"/>
            </div>

            <div className="field">
            <label>Author:</label>
            <select>
                <option>Select author</option>
                {displayAuthors()}
            </select>
            </div>

            <button>+</button>

        </form>
    );
    
};
export default AddBook;