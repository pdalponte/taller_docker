'use strict'
// Load our dependencies
const bodyParser = require('body-parser')
const express = require('express');
const mongo = require('mongodb')
// Setup database and server constants
const DB_NAME = 'word_database';
const DB_HOST = process.env.DB_HOST || 'localhost:27017';
const COLLECTION_NAME = 'words';
const SERVER_PORT = 8000;
// Create our app, database clients, and the word list array
const app = express();
const client = mongo.MongoClient();
const dbUri = `mongodb://${DB_HOST}/${DB_NAME}`;
const words = [];
// Setup our templating engine and form data parser
app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))
// Load all words that are in the database
function loadWordsFromDatabase() {
 return client.connect(dbUri).then((db) => {
 return db.collection(COLLECTION_NAME).find({}).toArray();
 })
 .then((docs) => {
 words.push.apply(words, docs.map(doc => doc.word));
 return words;
 });
}
// Our main landing page handler
app.get('/', (req, res) => {
 res.render('index', { words: words });
});
// Handler for POSTing a new word
app.post('/new', (req, res) => {
 const word = req.body.word;
 console.info(`Got word: ${word}`);
 if (word) {
 client.connect(dbUri).then((db) => {
 db.collection(COLLECTION_NAME).insertOne({ word }, () => {
 db.close();
 words.push(word);
 });
 });
 }
 res.redirect('/');
});
// Start everything by loading words and then starting the server
loadWordsFromDatabase().then((words) => {
 console.info(`Data loaded from database (${words.length} words)`);
 app.listen(SERVER_PORT, () => {
 console.info("Server started on port %d...", SERVER_PORT);
 });
});