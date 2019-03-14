require("dotenv").config();
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allow cross-origin requests
app.use(cors());

// connect to mongoDB database
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${
    process.env.DB_PASS
  }@cluster0-o1t8l.mongodb.net/test?retryWrites=true`
);

mongoose.connection.once("open", () => {
  console.log("connected to database");
});

// mongoose.connection.close();
app.use("/graphql", graphqlHTTP({ schema: schema, graphiql: true }));

app.listen(4000, () => console.log("now listening on port 4000"));
