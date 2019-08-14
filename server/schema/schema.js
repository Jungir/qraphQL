const graphql = require('graphql');
const _ = require('lodash');
const BookModel = require('../models/book_model');
const AuthorModel = require('../models/author_model');
const {
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;


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
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return _.filter(books, {authorId: parent.id})
            }
        }
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
                // return _.find(books, {id : args.id});
                
            
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data from db/other souce
                // return _.find(authors, {id : args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                // return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                // return authors;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor:{
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                let author = new AuthorModel({
                    name: args.name,
                    age: args.age
                });
                return author.save();
            }
        },
        addBook:{
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args){
                let book = new BookModel({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: Mutation
});