require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@cluster0-ys2zg.mongodb.net/test?retryWrites=true`
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(4000, () => console.log("now listening on port 4000"));
