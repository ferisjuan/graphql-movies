import { GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql'
import _ from 'lodash'

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
                // TODO
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
                // TODO
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
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(_parent, _args) {
                // TODO: get data from db
            }
        },
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                // TODO: get data from db
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(_parent, _args) {
                // TODO: get data from db
            }
        }
    }),
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                age: { type: GraphQLInt },
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                const director = new Director({
                    age: args.age,
                    name: args.name,
                })

                return director.save()
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args) {
                const movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })

                return movie.save()
            }
        }
    }
})

export default new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
