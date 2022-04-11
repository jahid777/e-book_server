const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7adfu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;
// const port = 5000;
const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  //   end the collection
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port);
app.listen(port, () => console.log(`connected database server${port}`));
