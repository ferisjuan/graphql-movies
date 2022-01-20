import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import schema from './schema/schema.js'

const app = express()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}))

app.listen(5001, () => {
    console.log('Server is running on port 5001')
})
