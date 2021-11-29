
import React, {useState, useEffect} from 'react'
import env from 'react-dotenv'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './components/MovieList'

/* dotenv.config() */
const {OMDBAPI, IDENTIFIER, APIKEY} = env

function App() {
  const [movies, setMovies] = useState([])

  const getMovieRequest = async() => {
    const url = `${OMDBAPI}/?s=star wars&i=${IDENTIFIER}&apikey=${APIKEY}`

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  useEffect(() => {
    getMovieRequest()
  }, [])

  return (
    <div className="App container-fluid movie-app">
      <div className='row'>
        <MovieList movies={movies}/>
      </div>
    </div>
  )
}

export default App
