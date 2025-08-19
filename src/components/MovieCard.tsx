import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMyContext } from '../context/AppContext';
import type { Movie } from '../libs/type';
import styles from './MovieCard.module.css'
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
    <div className={styles.pageWrapper}>
  {movie ? (
    <div className={styles.movieDetailCard}>
      <div>
      <img className={styles.poster} src={movie.Poster} alt={`${movie.Title} poster`} />
      </div>
      <div>
      <h2 className={styles.title}>{movie.Title} ({movie.Year})</h2>
      <p><strong>Director:</strong> {movie.Director}</p>
      <p><strong>Run time:</strong> {movie.Runtime}</p>
      <p><strong>Rating:</strong> {movie.imdbRating}</p>
      <div
        className={styles.like}
        onClick={() => isLiked ? removeFromFavourite(movie.imdbID) : addToFavourite(movie)}
        role="button"
        aria-label={isLiked ? "Remove from favourites" : "Add to favourites"}
      >
        {isLiked ? '❤️' : '🤍'}
      </div>
       </div>
    </div>
  ) : (
    <p>This movie does not exist</p>
  ) }
</div>
)

  
}
