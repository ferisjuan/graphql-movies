import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { MovieDetails } from '../movie-details/movie-details'
import { GET_MOVIES_QUERY } from '../queries'

export const MovieList = () => {
    const { loading, error, data } = useQuery(GET_MOVIES_QUERY)

    const [selectedMovieId, setSelectedMovieId] = useState(null)

    if (loading) return <p>Loading...</p>

    if (error) return <p>Error :(</p>

    const renderMovies = data.movies.map(movie => (
        <li key={movie.id} onClick={() => setSelectedMovieId(movie.id)}>
            {movie.name} - {movie.genre}
        </li>
    ))

    return (
        <div>
            <ul>{renderMovies}</ul>
            {!selectedMovieId ? (
                <div>
                    <h3>Please select a movie</h3>
                </div>
            ) : (
                <MovieDetails id={selectedMovieId} />
            )}
        </div>
    )
}
