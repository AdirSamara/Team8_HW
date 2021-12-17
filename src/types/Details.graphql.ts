import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const RepositoryDetailsGraphqlType = new GraphQLObjectType({
  name: "repository_details",
  fields: () => ({
    name: { type: GraphQLString },
    size: { type: GraphQLInt },
    owner: { type: GraphQLString },
    is_private: { type: GraphQLBoolean },
    files: { type: GraphQLInt },
    yml_content: { type: GraphQLString },
    webhooks: { type: new GraphQLList(GraphQLString) },
  }),
});
