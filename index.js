const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7adfu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const termsConditionCollection = client
    .db("onlineBook")
    .collection("bookstore");

  // INSERT terms and condition data AT THE DATABASE
  app.post("/addTermsCondition", (req, res) => {
    termsConditionCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the terms and Condition data from  collection
  app.get("/getAddTermsCondition", (req, res) => {
    termsConditionCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //   end the collection
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port);
app.listen(port, () => console.log(`connected database server${port}`));
