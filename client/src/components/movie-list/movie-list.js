import { useQuery } from '@apollo/client'
import { GET_MOVIES_QUERY } from '../queries'

export const MovieList = () => {
    const {
        loading,
        error,
        data
    } = useQuery(GET_MOVIES_QUERY)

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error :(</p>

    const renderMovies = data.movies.map(movie => (
        <li key={movie.id}>
            {movie.name} - {movie.genre}
        </li>
    ))

    return (
        <div>
            <ul>
                {renderMovies}
            </ul>
        </div>
    )
}
