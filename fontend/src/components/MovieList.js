import React from 'react'

function MovieList({movies, index}) {
  return (
    <>
      
      <div className='image-container d-flex justify-content-start'>
        {
          movies.map((movie, index) => (
            
              <img className='img-fluid m-3' src={movie.Poster} alt='movie' />
            
          ))
        }
      </div>
      
    </>
  )
}

export default MovieList
