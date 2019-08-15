import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthorQuery, BookQuery, addBookMutation } from '../Queries/BookQueries';
//beware 

function AddBook (){
    const { loading, data } = useQuery(AuthorQuery);
  
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
                //data has been added successfully, flash-msg
            }).then().catch((err)=>console.log(err));
        
    }
    // inline binding in its finest!
    return (
        <form id="add-book" onSubmit={submitForm }>

            <div className="field">
            <label>Book name:</label>
            <input type="text" onChange={(e)=> setName(e.target.value)}/>
            </div>

            <div className="field">
            <label>Genre:</label>
            <input type="text" onChange={(e)=> setGenre(e.target.value)}/>
            </div>

            <div className="field">
            <label>Author:</label>
            <select onChange={(e)=> {
                e.stopPropagation()
                setAuthorId(e.target.value)}
            }>
                <option>Select author</option>
                {displayAuthors()}
            </select>
            </div>

            <button>+</button>

        </form>
    );
    
};
export default AddBook;