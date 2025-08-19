import { useMyContext } from '../context/AppContext';
import { NavLink } from 'react-router-dom';
import styles from './Favorit.module.css'

export default function Favourite() {
    const context = useMyContext()
    if(!context) {
        return <p>Context not available</p>;
    }
    const {likedMovies, removeFromFavourite} = context;

  return (
  
     <div>
      <h2>Your Favourite Movies</h2>
      {likedMovies.length > 0 ? (
        <div className={styles.favGrid}>
          {likedMovies.map((movie) => (
            <div key={movie.imdbID} className={styles.favCard}>
              <NavLink to={`/movies/${movie.imdbID}`}>
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  className={styles.poster}
                />
              </NavLink>
              <div className={styles.info}>
                <h3>
                  {movie.Title} ({movie.Year})
                </h3>
                <p>Director: {movie.Director}</p>
                <p>Runtime: {movie.Runtime}</p>
                <p>Rating: {movie.imdbRating}</p>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromFavourite(movie.imdbID)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No favourite movies found</p>
      )}
    </div>
  )
}
