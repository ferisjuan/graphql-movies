import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import _ from 'lodash'

const movies = [
    {name: 'Star Wars', genre: 'sci-fi', id: '1'},
    {name: 'Jurasic Park', genre: 'adventure', id: '2'},
    {name: 'The Godfather', genre: 'drama', id: '3'},
    {name: 'Terminator 2', genre: 'action-sci-fi', id: '4'},
]

const directors = [
    { name: 'George Lucas', age: 60, id: '1' },
    { name: 'Steven Spielberg', age: 74, id: '2' },
    { name: 'Francis Ford Coppola', age: 82, id: '3' },
    { name: 'James Cameron', age: 67, id: '4' },
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
    }),
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // TODO: get data from db
                return _.find(movies, { id: args.id })
            },
        },
        director: {
            type: DirectorType,
            args: {id: { type: GraphQLID }},
            resolve(parent, args) {
                // TODO: get data from db
                return _.find(directors, { id: args.id })
            }
        }
    }),
})

export default new GraphQLSchema({
    query: RootQuery
})
