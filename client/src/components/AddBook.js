import React, {useState} from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthorQuery, BookQuery } from '../Queries/BookQueries';
//beware 

function AddBook (){
    const { loading, data } = useQuery(AuthorQuery);
    const addBookMutation = gql`
        mutation($name: String!, $genre: String!, $authorId: ID!){
            addBook(name: $name, genre: $genre, authorId: $authorId){
                name,
                id
            }
        }
        `;

    const [addBook] = useMutation(addBookMutation);
    // addBook('HP', 'advanture', Math.random()).then(()=> console.log(newdata));
    
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");
    
    const displayAuthors = () => (
        loading ? 
            (<option disabled>Loading authors...</option> )
            : (data.authors.map(author => {
            return <option key={author.id} value={author.id}>{author.name}</option>})
            )
    );
    
    const submitForm = (e) => {
        e.preventDefault();
        const state = {
            name,
            genre,
            authorId
        }
        
        addBook({
                variables : {
                    name: state.name, 
                    genre: state.genre, 
                    authorId: state.authorId 
                }, 
                refetchQueries: [{query: BookQuery}]
            }).then((data)=> console.log(data)).catch((err)=>console.log(err));
        
    }
    // inline binding in its finest!
    return (
        <form id="add-book" onSubmit={submitForm }>

            <div className="field">
            <label>Book name: {name}</label>
            <input type="text" onChange={(e)=> setName(e.target.value)}/>
            </div>

            <div className="field">
            <label>Genre: {genre}</label>
            <input type="text" onChange={(e)=> setGenre(e.target.value)}/>
            </div>

            <div className="field">
            <label>Author: {authorId}</label>
            <select onChange={(e)=> setAuthorId(e.target.value)}>
                <option>Select author</option>
                {displayAuthors()}
            </select>
            </div>

            <button>+</button>

        </form>
    );
    
};
export default AddBook;