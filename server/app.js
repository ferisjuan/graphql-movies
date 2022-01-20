import express from 'express'
import { graphqlHTTP } from 'express-graphql'

const app = express()

app.use('/graphql', graphqlHTTP({

}))

app.listen(5001, () => {
    console.log('Server is running on port 5001')
})
