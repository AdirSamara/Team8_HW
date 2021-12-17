const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
import schema from "./schema";

const URL = "/graphql";

app.use(
  URL,
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Running a GraphQL API server at http://localhost:${PORT}${URL}`);
});
