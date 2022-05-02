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
    .collection("termsAndCondition");

  const frontPageTopImgCollection = client
    .db("onlineBook")
    .collection("topImg");

  const frontPageMiddleImgCollection = client
    .db("onlineBook")
    .collection("middleImg");

  const frontPageDisclaimerCollection = client
    .db("onlineBook")
    .collection("disclaimer");

  const bookCollection = client.db("onlineBook").collection("books");

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

  // INSERT Top Image AT THE DATABASE
  app.post("/addFrontPageTopImage", (req, res) => {
    frontPageTopImgCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page Top Image from  collection
  app.get("/getFrontPageTopImage", (req, res) => {
    frontPageTopImgCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // INSERT middle Image AT THE DATABASE
  app.post("/addFrontPageMiddleImage", (req, res) => {
    frontPageMiddleImgCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page middle Image from  collection
  app.get("/getFrontPageMiddleImage", (req, res) => {
    frontPageMiddleImgCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // INSERT disclaimer data AT THE DATABASE
  app.post("/addFrontPageDisclaimer", (req, res) => {
    frontPageDisclaimerCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page disclaimer from  collection
  app.get("/getFrontPageDisclaimer", (req, res) => {
    frontPageDisclaimerCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // INSERT Books DATA AT THE DATABASE
  app.post("/addBookData", (req, res) => {
    bookCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the Books DATA from  collection
  app.get("/getBookData", (req, res) => {
    bookCollection.find({}).toArray((err, documents) => {
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
