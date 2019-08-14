const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
const mongoose = require('mongoose');
var cors = require('cors');
//allow cross origin requests
app.use(cors())

mongoose.connect('mongodb://localhost:27017/graphql', {useNewUrlParser: true})
    .then(()=>{console.log('connected to db')})
    .catch((err)=> {console.log('there is and error:', err)});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, function () {
    console.log('server app and running');
});