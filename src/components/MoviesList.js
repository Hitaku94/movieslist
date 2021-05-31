import React from 'react'
import { Link } from 'react-router-dom'

export default function MoviesList(props) {

    const {movies} = props
    return (
        <div class="grid">
            {
                movies.map((e) => {
                    return (
                        <Link to={`/movies/${e.id}`}><img src={`https:/image.tmdb.org/t/p/w300${e.poster_path}`}/></Link> 
                    )
                })
            }
        </div>
    )
}
