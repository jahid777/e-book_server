const express = require("express");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
var bodyParser = require("body-parser");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7adfu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

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

  const displayBookBannerImg = client
    .db("onlineBook")
    .collection("displayBookImage");

  const bookCollection = client.db("onlineBook").collection("books");

  // INSERT terms and condition data AT THE DATABASE
  app.post("/addTermsCondition", (req, res) => {
    termsConditionCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the terms and Condition data from  collection
  app.get("/getTermsCondition", (req, res) => {
    termsConditionCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //delete the terms and condition data from database
  app.delete("/termsConditiondelete/:id", async (req, res) => {
    try {
      const termsConditionId = req.params.id;
      const result = await termsConditionCollection.deleteOne({
        _id: ObjectId(termsConditionId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT Top Image  AT THE DATABASE home page
  app.post("/addFrontPageTopImage", (req, res) => {
    frontPageTopImgCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page Top Image from  collection home page
  app.get("/getFrontPageTopImage", (req, res) => {
    frontPageTopImgCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // delete the front page Top Image from  collection home page
  app.delete("/topImgdelete/:id", async (req, res) => {
    try {
      const FrontTopImgId = req.params.id;
      const result = await frontPageTopImgCollection.deleteOne({
        _id: ObjectId(FrontTopImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT middle Image AT THE DATABASE home page
  app.post("/addFrontPageMiddleImage", (req, res) => {
    frontPageMiddleImgCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page middle Image from  collection home page
  app.get("/getFrontPageMiddleImage", (req, res) => {
    frontPageMiddleImgCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // delete the front page middle Image from  collection home page
  app.delete("/middleImgdelete/:id", async (req, res) => {
    try {
      const FrontMidImgId = req.params.id;
      const result = await frontPageMiddleImgCollection.deleteOne({
        _id: ObjectId(FrontMidImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  // INSERT disclaimer data AT THE DATABASE home page
  app.post("/addFrontPageDisclaimer", (req, res) => {
    frontPageDisclaimerCollection.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  // get the front page disclaimer from  collection home page
  app.get("/getFrontPageDisclaimer", (req, res) => {
    frontPageDisclaimerCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  // delete the front page disclaimer from  collection home page
  app.delete("/disclaimerDelete/:id", async (req, res) => {
    try {
      const FrontDisclaimerId = req.params.id;
      const result = await frontPageDisclaimerCollection.deleteOne({
        _id: ObjectId(FrontDisclaimerId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //Insert display book top banner Image books display page
  app.post("/addDisplayBookTopImage", (req, res) => {
    displayBookBannerImg.insertOne(req.body).then((result) => {
      res.send(result);
    });
  });

  //get the display books top banner
  app.get("/DisplayBookTopImage", (req, res) => {
    displayBookBannerImg.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  //delete the display book banner
  app.delete("/bookDisplayImgdelete/:id", async (req, res) => {
    try {
      const displayBooksBannerImgId = req.params.id;
      const result = await displayBookBannerImg.deleteOne({
        _id: ObjectId(displayBooksBannerImgId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
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

  //get the single book for editing from collection
  app.get("/singleBook/:id", (req, res) => {
    bookCollection
      .find({ _id: ObjectId(req.params.id) })
      .toArray((err, documents) => {
        res.send(documents[0]);
      });
  });

  //update books data edit
  app.patch("/updateBook/:id", (req, res) => {
    bookCollection
      .updateOne(
        { _id: ObjectId(req.params.id) },
        {
          $set: {
            bookImg: req.body.bookImg,
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            isbn: req.body.isbn,
            bookNumber: req.body.bookNumber,
            bookLink: req.body.bookLink,
            downloadBookLink: req.body.downloadBookLink,
          },
        }
      )
      .then((result) => {
        res.send(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //delete the books data from colletion
  app.delete("/bookDelete/:id", async (req, res) => {
    try {
      const booksId = req.params.id;
      const result = await bookCollection.deleteOne({
        _id: ObjectId(booksId),
      });
      if (result.deletedCount > 0) {
        res.send(true);
      }
    } catch (error) {
      console.log("err", error);
    }
  });

  //   end the collection
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app.listen(port);
app.listen(port, () => console.log(`connected database server${port}`));
