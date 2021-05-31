import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter} from "react-router-dom";
import './App.css';
import axios from "axios";
import NavBar from "./components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import MoviesDetails from "./components/MoviesDetails";


function App() {

  const [movies, updateMovies] = useState([])

const handleFetch = () => {
  axios.get("https://api.themoviedb.org/3/movie/now_playing?api_key=f01480077ec8851aad26e87d0a5d0dd1&language=en-US")
  .then((response) => {
    updateMovies(response.data.results)

  }).catch((err) => {
    console.log(err)
  })
}
  useEffect(() => {
    handleFetch()
  },[]);

if (!movies) {
  return <h1>Loading . ..</h1>
}

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" render={(routeProps) => {
            return <Home 
            movies={movies}  
            {...routeProps} 

            />;}}/>
        <Route exact path="/movies/:movieId" render={(routeProps) => {
            return <MoviesDetails movies={movies}  {...routeProps} />;}}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
