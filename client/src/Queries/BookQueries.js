import { gql } from 'apollo-boost';
export const AuthorQuery = gql`
{   
    authors{
        name
        id
    }
}
`

export const BookQuery = gql`
{
    books{
        name
        id
    }
}
`