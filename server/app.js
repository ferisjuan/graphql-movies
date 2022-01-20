import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import { graphqlHTTP } from 'express-graphql'

import schema from './schema/schema.js'

config()

const app = express()

const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.ocgbu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.once('open', () => {
    console.log('Connection to mongoDB established successfully')
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(5001, () => {
    console.log('Server is running on port 5001')
})
