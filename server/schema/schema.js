const graphql = require('graphql');
// graphql.
const {GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

//schema file has 3 responsibilites:
//1. To define types: Booktype
//2. define relationships b-n types: Books <-> Authors
//3. Queries: root query, Book, Author root queries
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields : () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    }),
});

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book: {
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // code to get data from db/other source
                // args.id
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query : RootQuery
});