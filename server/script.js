const { query } = require("express");
const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "Library";
const booksCollectionName = "Books";
const writeCollectionName = "writer";

let collectionB, collectionW;
const client = new MongoClient(uri);

const ConnectToDB = async () => {
  try {
    await client.connect();
    const db = client.db(dbName);
    collectionB = db.collection(booksCollectionName);
    collectionW = db.collection(writeCollectionName);
    console.log("Successfully connected to the database.");
  } catch (error) {
    console.error("Error:", error);
  }
};
const PresentBooksOfWriter = async (name) => {
  const books = await collectionB.find({ writer: name }).toArray();
  result = books
    .map((book) => {
      return (
        "name:" +
        book.name +
        " ,description:" +
        book.description +
        " ,pages" +
        book.pages +
        "\n"
      );
    })
    .toString();
  console.log(result);
  //   client.close();
};

const SearchBook = async (bookname) => {
  try {
    const books = await collectionB.find({
      name: { $regex: bookname, $options: "i" },
    });
    const booksArray = await books.toArray();
    console.log(booksArray);
  } catch (error) {
    console.error("Error:", error);
  }
};
const PresentUpFromPages = async (number) => {
  try {
    const books = await collectionB.find({ pages: { $gt: number } });
    const booksArray = await books.toArray();
    console.log(booksArray);
  } catch (error) {
    console.error("Error:", error);
  }
};
const findQuery = async (collection, query) => {
  try {
    const books = await collection.find(query);
    const booksArray = await books.toArray();
    console.log(booksArray);
  } catch (error) {
    console.error("Error:", error);
  }
};

const addNewDocument = async (collectionName, document) => {
  if (collectionName === booksCollectionName) {
    await collectionB.insertOne(document);
  }

  if (collectionName === writeCollectionName) {
    await collectionW.insertOne(document);
  }
};

const QueryToTargil25 = {
  pages: { $gt: 200 },
  //   date: { $and: [{ $gt: "2015-01-01", $lt: "2020-01-01" }] },
  date: { $gt: "2015-01-01", $lt: "2020-01-01" },
  name: { $regex: "^p" },
};
const newBook = {
  name: "New Book",
  description: "Short description of Book 1.",
  date: "2022-01-15",
  writer: "eyal",
  pages: 345,
};
const main = async () => {
  return "Hello, World!";
  //   await ConnectToDB();
  //   console.log("Search Function");
  //   await SearchBook("po");
  //   console.log("Books with writer");
  //   await PresentBooksOfWriter("eyal");
  //   console.log("All books up from 250:");
  //   await PresentUpFromPages(250);
  //   await addNewDocument("Books", newBook);
  //   // Additional function calls or logic here
  //   console.log("the book added");
  //   console.log("Books of targil 25");
  //   await findQuery(collectionB, QueryToTargil25);
};
module.exports = main;
// main();
