import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {useMyContext} from "../context/AppContext";
import type { Movie } from "../libs/type";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const context = useMyContext();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch(`https://www.omdbapi.com/?s=lion&apikey=16c8cb0e`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    };

    fetchMovies();
  }, []);

  if (!context) {
    return <p>Context not available</p>;
  }
  const {likedMovies, addToFavourite, removeFromFavourite} = context;

  return (
    <div>
      <h1>List of Movies</h1>
      {movies.length > 0 ? (
        movies.map((movie) => {
          const isLike = (likedMovies as Movie[]).some((m: Movie) => m.imdbID === movie.imdbID);
          return (
            <div key={movie.imdbID}>
              <div>
                <NavLink to={`/movies/${movie.imdbID}`}>
                  {movie.Title} ({movie.Year})
                </NavLink>
                <span
                  className="like"
                  onClick={() =>
                    isLike
                      ? removeFromFavourite(movie.imdbID)
                      : addToFavourite(movie)
                  }
                >
                  {isLike ? '❤️' : '🤍'}
                </span>
              </div>
              <NavLink to={`/movies/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} />
              </NavLink>
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
