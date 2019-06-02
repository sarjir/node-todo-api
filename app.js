const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const createNotFoundStatus = require('./error-handling').createNotFoundStatus;
const handleFalseyData = require('./error-handling').handleFalseyData;
const assert = require('assert');

const app = express();
app.use(express.json());
const port = 3000;

const dbUrl = 'mongodb://mongo:27017';
const dbName = 'todo-api';
const client = new MongoClient(dbUrl);
let db;

const emptyState = {
  id: null,
  active: null,
  status: null
}

app.get('/', (req, res) => {
  res.json("Welcome to the todo API");
});

app.post('/todos', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  db.collection('todos').insertOne(req.body);
  res.status(200).json(req.body);
})

app.get('/todos/:id', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  db.collection('todos').findOne({ _id: ObjectID.createFromHexString(req.params.id) }).then((document, err) => {
    handleFalseyData({ response: res, result: document, resultErrorMsg: 'No todo was found with that id', error: err });

    return res.status(200).json(document);
  });
})

app.get('/users/:user/todos/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const allTodosForUser = db.collection('todos').find({ userId: ObjectID.createFromHexString(req.params.user) }).toArray().then((result, err) => {
    if (err) {
      return createNotFoundStatus(res, err);
    }

    return res.status(200).json(result);
  });
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db = client.db(dbName);
});