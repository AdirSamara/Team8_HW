import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export const RepositoryGraphqlType = new GraphQLObjectType({
  name: "repository",
  fields: () => ({
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    owner: { type: GraphQLString },
  }),
});
