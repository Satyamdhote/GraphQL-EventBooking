if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
// const { buildSchema } = require("graphql");
const bcrypt = require("bcryptjs");

const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");

const app = express();

// const events = [];

app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

//Connect to DB
const mongoose = require("mongoose");
const user = require("./models/user");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to mongoose"));

app.listen(3000);
