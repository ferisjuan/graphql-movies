import { useQuery } from '@apollo/client'
import { GET_MOVIE_QUERY } from '../queries'

export const MovieDetails = ({ id }) => {
    const { data, error, loading } = useQuery(GET_MOVIE_QUERY, {
        variables: { id },
    })

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error :(</p>

    const renderMovie = () => {
        const { movie } = data || {}

        return (
            <div>
                <h2>{movie.name}</h2>
                <p>{movie.genre}</p>
                <p>Directed by: {movie.director.name}</p>
                <p>Other movies by this director:</p>
                <ul>
                    {movie.director.movies.map(item => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
            </div>
        )
    }

    return <div>{renderMovie()}</div>
}
