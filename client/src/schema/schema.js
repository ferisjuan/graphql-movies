import {
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql'

import Director from '../models/director.js'
import Movie from '../models/movie.js'

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, _args) {
                return Director.findById(parent.directorId)
            },
        },
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
                return Movie.find({ directorId: parent.id })
            },
        },
    }),
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return Director.findById(args.id)
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(_parent, _args) {
                return Director.find({})
            },
        },
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return Movie.findById(args.id)
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(_parent, _args) {
                return Movie.find({})
            },
        },
    }),
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                age: { type: new GraphQLNonNull(GraphQLInt) },
                name: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const director = new Director({
                    age: args.age,
                    name: args.name,
                })

                return director.save()
            },
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) },
                directorId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId,
                })

                return movie.save()
            },
        },
    },
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
})
