import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMyContext } from '../context/AppContext';
import type { Movie } from '../libs/type';

export default function MovieCard() {
  const {id} = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const context = useMyContext();

  useEffect(()=> {
      fetch(`https://www.omdbapi.com/?i=${id}&apikey=16c8cb0e`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.Response !== "False") {
            setMovie(data);
          } else {
            setMovie(null);
          }
        });
  }, [id])

  if (!context) {
    return <p>Context not available</p>;
  }
  const {likedMovies, addToFavourite, removeFromFavourite} = context;

  const isLiked = (likedMovies as Movie[]).some((m: Movie) => m.imdbID === id)
  
  return (
    movie 
    ? (
    <div>
      <h2>{movie.Title} ({movie.Year})</h2>
      <p>Director: {movie.Director}</p>
      <p>Run time: {movie.Runtime}</p>
      <p>Rating: {movie.imdbRating}</p>
      <div className='like' onClick={()=> isLiked ? removeFromFavourite(movie.imdbID) : addToFavourite(movie)}>{isLiked ? '❤️' : '🤍'}</div>
      <img src={movie.Poster} alt="movie" />  
    </div>
    ) : (
      <p>This movie does not exist</p>
    )

  )
}
