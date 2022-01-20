import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import { MovieList } from './components/movie-list/movie-list'
import { AddMovies } from './components/add-movie/add-movie'

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    cache: new InMemoryCache(),
})

function App() {
    return (
        <ApolloProvider client={client}>
            <div>
                <h1>Watch List</h1>
                <MovieList />
                <AddMovies />
            </div>
        </ApolloProvider>
    )
}

export default App
