import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { RepositoryGraphqlType } from "./types/Repository.graphql";
import { RepositoryDetailsGraphqlType } from "./types/Details.graphql";

const { reposList, reposDetails } = require("./resolver.ts");
const resolver = {
  reposList: reposList,
  reposDetails: reposDetails,
};

const rootQuery = new GraphQLObjectType({
  name: "repositories",
  description: "github repositories information",
  fields: {
    reposList: {
      type: new GraphQLList(RepositoryGraphqlType),
      args: {
        githubUsername: { type: GraphQLString },
        githubToken: { type: GraphQLString },
      },
      resolve(_, args) {
        return resolver.reposList(args.githubUsername, args.githubToken);
      },
    },
    reposDetails: {
      type: new GraphQLList(RepositoryDetailsGraphqlType),
      args: {
        githubUsername: { type: GraphQLString },
        githubToken: { type: GraphQLString },
      },
      resolve(_, args) {
        return resolver.reposDetails(args.githubUsername, args.githubToken);
      },
    },
  },
});

export default new GraphQLSchema({
  query: rootQuery,
});
