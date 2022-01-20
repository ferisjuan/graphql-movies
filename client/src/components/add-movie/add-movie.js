import { useState } from 'react'

import { useMutation, useQuery } from '@apollo/client'
import { ADD_MOVIE_MUTATION, GET_DIRECTORS_QUERY, GET_MOVIES_QUERY } from '../queries'

export const AddMovies = () => {
    const { data, error, loading } = useQuery(GET_DIRECTORS_QUERY)
    const [addMovie] = useMutation(ADD_MOVIE_MUTATION)

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [directorId, setDirectorId] = useState('')

    const renderDirectors = () => {
        if (loading) return <option disabled>Loading...</option>

        if (error) return <option disabled>Something went wrong :(</option>

        return data?.directors.map(director => (
            <option key={director.id} value={director.id}>
                {director.name}
            </option>
        ))
    }

    const handleSubmit = e => {
        e.preventDefault()

        addMovie({ variables: { name, genre, directorId }, refetchQueries: [{query: GET_MOVIES_QUERY}] })
    }

    return (
        <form id='add-movie' onSubmit={handleSubmit}>
            <div>
                <label htmlFor='movie-name'>Movie Name:</label>
                <input
                    id='movie-name'
                    name='movie-name'
                    onChange={e => setName(e.target.value)}
                    type='text'
                />
            </div>
            <div>
                <label htmlFor='movie-genre'>Genre:</label>
                <input
                    id='movie-genre'
                    name='movie-genre'
                    onChange={e => setGenre(e.target.value)}
                    type='text'
                />
            </div>
            <div>
                <label htmlFor='director'>Director</label>
                <select
                    name='director'
                    id='director'
                    onChange={e => setDirectorId(e.target.value)}
                >
                    <option>Select a director</option>
                    {renderDirectors()}
                </select>
            </div>
            <div>
                <button type='submit'>Add New Movie</button>
            </div>
        </form>
    )
}
