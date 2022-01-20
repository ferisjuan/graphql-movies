import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import _ from 'lodash'

const movies = [
    {name: 'Star Wars', director: 'George Lucas', id: '1'},
    {name: 'Matrix', director: 'Wachowski', id: '2'},
    {name: 'Interstellar', director: 'Nolan', id: '3'},
    {name: 'Inception', director: 'Christopher Nolan', id: '4'},
]

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
                return _.find(movies, { id: args.id })
            },
        },
    }),
})

export default new GraphQLSchema({
    query: RootQuery
})
