import { useMyContext } from '../context/AppContext';
import { NavLink } from 'react-router-dom';

export default function Favourite() {
    const context = useMyContext()
    if(!context) {
        return <p>Context not available</p>;
    }
    const {likedMovies, removeFromFavourite} = context;

  return (
    <div>
        <h2>Your favourite Movies</h2>
        {likedMovies.length > 0 
        ? (
            likedMovies.map((movie) => (
                <div key={movie.imdbID}>
                    <h3>{movie.Title} ({movie.Year})</h3>
                    <p>Director: {movie.Director}</p>
                    <p>Runtime: {movie.Runtime}</p>
                    <p>Rating: {movie.imdbRating}</p>
                    <NavLink to={`/movies/${movie.imdbID}`}><img src={movie.Poster} alt={movie.Title} /></NavLink>
                    <button onClick={() => removeFromFavourite(movie.imdbID)}>Remove</button>
                </div>
            ))
        ) : (
            <p>No favourite movies found</p>
        )}
    </div>
  )
}
