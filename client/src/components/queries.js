import { gql } from '@apollo/client'

export const GET_DIRECTORS_QUERY = gql`
    {
        directors {
            id
            name
        }
    }
`

export const GET_MOVIES_QUERY = gql`
    {
        movies {
            id
            genre
            name
        }
    }
`
