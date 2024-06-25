const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");
const bodyparser = require('body-parser')

dotenv.config();

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//Database Name
const dbName = "passop";
const app = express();
const port = 3000;
client.connect();
app.use(bodyparser.json())

//get all the password
app.get("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("documents");

  const findResult = await collection.find({}).toArray();

  res.json(findResult);
});

// save a password
app.post("/", async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection("documents");

  const findResult = await collection.find({}).toArray();

  res.json(findResult);
});


//delet a password
// app.get("/", async (req, res) => {
//   const db = client.db(dbName);
//   const collection = db.collection("documents");

//   const findResult = await collection.find({}).toArray();

//   res.json(findResult);
// });

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
