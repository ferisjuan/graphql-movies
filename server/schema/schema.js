import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                // TODO: get data from db
            },
        },
    }),
})

export default new GraphQLSchema({
    query: RootQuery
})
