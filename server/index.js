const express = require("express");
require("dotenv").config();
const schema = require("./schema/schema");
// eslint-disable-next-line no-unused-vars
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");

const { graphqlHTTP } = require("express-graphql");
const port = process.env.PORT || 5000;

const app = express();

// Connect to DB
connectDB();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
