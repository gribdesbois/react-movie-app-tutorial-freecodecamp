
import React, {useState, useEffect} from 'react'
import env from 'react-dotenv'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import MovieList from './components/MovieList/MovieList'
import MovieListHeading from './components/MovieList/MovieListHeading'
import SearchBox from './components/Search/SearchBox'
import AddFavourite from './components/Favourites/AddFavourite'
import RemoveFavourites from './components/Favourites/RemoveFavourites'

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

  useEffect(() => {
    getMovieRequest(searchValue)
  }, [searchValue])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    ) || []
    setFavourites(movieFavourites)
  }, [])

  const saveToLocalStorage = (items) => {
    const storedItem = JSON.stringify(items)
    localStorage.setItem('react-movie-app-favourites', storedItem )
  }

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie]
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    )
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList)
  }

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
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList 
          movies={favourites} 
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites} 
        />
      </div> 
    </div>
  )
}

export default App
