import React from 'react'

function MovieList({movies, index, favouriteComponent, handleFavouritesClick}) {
  const FavouriteComponent = favouriteComponent

  return (
    <>
      
      <div className='image-container d-flex justify-content-start'>
        {
          movies.map((movie, index) => (
            <div className='true-image-container m-3' key={index}>
              <img className='img-fluid  movie-card' src={movie.Poster} alt='movie' />
              <div 
              onClick={() => handleFavouritesClick(movie)}
              className='overlay d-flex align-items-center justify-content-center'
              >
                <FavouriteComponent />
              </div>
            </div>            
          ))
        }
      </div>      
    </>
  )
}

export default MovieList
