const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();
app.use(express.json());
const port = 3000;

const dbUrl = 'mongodb://mongo:27017';
const dbName = 'todo-api';
const client = new MongoClient(dbUrl);
let db;

app.get('/', (req, res) => {
  res.json("Welcome to the todo API");
});

app.post('/todos/add', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  db.collection('todos').insertOne(req.body);
  res.status(200).json(req.body);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});