const graphql = require('graphql');
const _ = require('lodash');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID
} = graphql;

// dummy data
let books = [
    {name: 'Book1', genre: 'Fantasy', id: "1"},
    {name: 'Book2', genre: 'Fantasy', id: "2"},
    {name: 'Book3', genre: 'Sci-Fi', id: "3"}
]
//schema file has 3 responsibilites:
//1. To define types: Booktype
//2. define relationships b-n types: Books <-> Authors
//3. Queries: root query, Book, Author root queries
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
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
        }
    }
})
module.exports = new GraphQLSchema({
    query : RootQuery
});