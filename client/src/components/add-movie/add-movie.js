import { useQuery } from '@apollo/client'
import { GET_DIRECTORS_QUERY } from '../queries'

export const AddMovies = () => {
    const { data, error, loading } = useQuery(GET_DIRECTORS_QUERY)

    const renderDirectors = () => {
        if (loading) return <option disabled>Loading...</option>

        if (error) return <option disabled>Something went wrong :(</option>

        return data?.directors.map(director =>  (
            <option key={director.id} value={director.id}>
                {director.name}
            </option>
        )
    )}

    return (
        <form id='add-movie'>
            <div>
                <label htmlFor='movie-name'>Movie Name:</label>
                <input id='movie-name' name='movie-name' type='text' />
            </div>
            <div>
                <label htmlFor='movie-genre'>Genre:</label>
                <input id='movie-genre' name='movie-genre' type='text' />
            </div>
            <div>
                <label htmlFor='director'>Director</label>
                <select name='director' id='director'>
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
