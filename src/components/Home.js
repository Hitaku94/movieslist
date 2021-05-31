import React from 'react'
import MoviesList from './MoviesList'

export default function Home(props) {
    const {movies} = props
    return (
        <div>
            <MoviesList movies={movies}/>
        </div>
    )
}
