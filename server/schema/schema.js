const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

// dummy data
let books = [
    {name: 'Book1', genre: 'Fantasy', id: "1", authorId: "1"},
    {name: 'Book2', genre: 'Fantasy', id: "2", authorId: "2"},
    {name: 'Book3', genre: 'Sci-Fi', id: "3", authorId: "3"}
];
let authors = [
    {name: 'patric 1', age: 44, id: "1"},
    {name: 'patric 2', age: 42, id: "2"},
    {name: 'patric 3', age: 66, id: "3"}
];
//schema file has 3 responsibilites:
//1. To define types: Booktype
//2. define relationships b-n types: Books <-> Authors
//3. Queries: root query, Book, Author root queries
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id:parent.authorId})
            }
        }
    }),
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    }),
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db/other source
                return _.find(books, {id : args.id});
                
            
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db/other souce
                return _.find(authors, {id : args.id});
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query : RootQuery
});