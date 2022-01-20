import { ApolloClient, ApolloProvider, InMemoryCache, } from '@apollo/client';

import { MovieList } from './components/movie-list/movie-list'

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
        </div>
      </ApolloProvider>
    )
}

export default App
