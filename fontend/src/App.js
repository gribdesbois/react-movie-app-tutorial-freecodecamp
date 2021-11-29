
import React, {useState, useEffect} from 'react'
import env from 'react-dotenv'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './components/MovieList/MovieList'
import MovieListHeading from './components/MovieList/MovieListHeading'
import SearchBox from './components/Search/SearchBox'
import AddFavourite from './components/Favourites/AddFavourite'

/* dotenv.config() */
const {OMDBAPI, IDENTIFIER, APIKEY} = env

function App() {
  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favourites, setFavourites] = useState([])

  const getMovieRequest = async(searchValue) => {
    const url = `${OMDBAPI}/?s=${searchValue}&i=${IDENTIFIER}&apikey=${APIKEY}`

    const response = await fetch(url)
    const responseJson = await response.json()

    if (responseJson.Search) {
      setMovies(responseJson.Search)
    }
  }

  const AddFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
  }

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  return (
    <div className="App container-fluid movie-app">
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          favouriteComponent={AddFavourite}
          handleFavouritesClick={AddFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList movies={favourites} favouriteComponent={AddFavourite} />
      </div> 
    </div>
  )
}

export default App
