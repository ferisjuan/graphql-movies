import graphql, { GraphQLObjectType, GraphQLString } from 'graphql'

const MovieType = new GraphQLQbjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
    })
})
