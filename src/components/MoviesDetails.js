import React, { useState, useEffect } from "react";
import axios from "axios";
import CarouselResp from "./Carousel";
import { Link } from 'react-router-dom'
import '../MoviesDetails.css'

export default function MoviesDetails(props) {

  const [movie, updateMovie] = useState(null);
  const [actors, updateActors] = useState(null);
  const [images, updateImages] = useState(null);
  const [recommendations, updateRecommendations] = useState(null)
  let movieId = props.match.params.movieId;



const fetchMovie = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=f01480077ec8851aad26e87d0a5d0dd1&language=en-US`
      )
      .then((response) => {
        updateMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

const fetchActors = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=f01480077ec8851aad26e87d0a5d0dd1&language=en-US`)
      .then((response) => {
        updateActors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

const fetchImages = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=f01480077ec8851aad26e87d0a5d0dd1&language=en-US&include_image_language=en`)
      .then((response) => {
        updateImages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
}

const fetchRecommendations = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=f01480077ec8851aad26e87d0a5d0dd1&language=en-US&include_image_language=en`)
    .then((response) => {
      updateRecommendations(response.data.results);
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error);
    });
}

  useEffect(() => {

    fetchMovie()
    fetchActors()
    fetchImages()
    fetchRecommendations()

  }, []);

  useEffect(() => {
    fetchMovie()
    fetchActors()
    fetchImages()
    fetchRecommendations()
  }, [props.match.params.movieId]);


  if (!movie || !actors || !images || !recommendations) {
    return <h1>Loading...</h1>
}


let popularity = [...actors.cast]
let sortPopularity = popularity.sort((a, b) => {
    return b.popularity - a.popularity;
}).slice(0, 5)

let sortRecommendations = [...recommendations].slice(0, 10)


  return (
      <div className="allcontainer">
    <div className="movieDetailContainer">
      <div className="movie-det-upper">
        <img src={`https:/image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
        <div className="movie-det-desc">
          <div className="movie-det-title">
            <h1>{movie.title}</h1>
            <div className="average-circle">
            <h3>{movie.vote_average}</h3>
            </div>
          </div>
          <h3>{movie.tagline}</h3>
          <p>{movie.overview}</p>
          <h5>Genre: {movie.genres.name}</h5>
          <div className="movie-det-info">
            <p>Release date: {movie.release_date}</p>
            <p>Duration: {movie.runtime} min</p>
            <p>Budget: {movie.budget}</p>
          </div>
        </div>
      </div>
      <div className="movie-det-actors">
        {
            sortPopularity.map((e) => {
                return (
                    <div key={e.id} className="movie-det-actors-box">
                    <img src={`https:/image.tmdb.org/t/p/w200${e.profile_path}`} alt={e.name}/>
                    <h5>{e.name}</h5>
                    <p>{e.character}</p>
                    </div>
                )
            })
        }
      </div>
      <div className="movie-det-gallerie">
        <h3>GALLERY</h3>
        <CarouselResp images={images}/>
      </div>
      <div className="movie-det-downbox">
          <h3>Some Recommendations</h3>
          <div className="movie-det-grid">
          {
          sortRecommendations.map((e) => {
              return (
                <Link to={`/movies/${e.id}`}>
                  <div key={e.id} className="movie-det-grid-item">
                      <img src={`https:/image.tmdb.org/t/p/w200${e.poster_path}`} alt={e.title}/>
                  </div>
                  </Link>
              )
          })
          }
          </div>
      </div>
    </div>
    </div>
  );
}
