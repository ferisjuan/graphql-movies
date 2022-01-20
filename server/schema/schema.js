import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import _ from 'lodash'

const movies = [
    {name: 'Star Wars', genre: 'sci-fi', id: '1', directorId: '1'},
    {name: 'Jurasic Park', genre: 'adventure', id: '2', directorId: '2'},
    {name: 'The Godfather', genre: 'drama', id: '3', directorId: '3'},
    {name: 'Terminator 2', genre: 'action-sci-fi', id: '4', directorId: '4'},
    {name: 'The Empire Strikes Back', genre: 'action-sci-fi', id: '5', directorId: '1'},
    {name: 'Return of the Jedi', genre: 'sci-fi', id: '6', directorId: '1'},
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
        director: {
            type: DirectorType,
            resolve(parent, _args) {
                return _.find(directors, {id: parent.directorId})
            }
        }
    }),
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, _args) {
                return _.filter(movies, {directorId: parent.id})
            }
        }
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        director: {
            type: DirectorType,
            args: {id: { type: GraphQLID }},
            resolve(_parent, args) {
                // TODO: get data from db
                return _.find(directors, { id: args.id })
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(_parent, _args) {
                return directors
            }
        },
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                // TODO: get data from db
                return _.find(movies, { id: args.id })
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(_parent, _args) {
                return movies
            }
        }
    }),
})

export default new GraphQLSchema({
    query: RootQuery
})
