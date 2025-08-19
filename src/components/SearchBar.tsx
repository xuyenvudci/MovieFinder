import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useMyContext } from '../context/AppContext';
import type { Movie } from '../libs/type';

type Status = "idle" | "loading" | "done";

export default function SearchBar() {
  const [searchMovie, setSearchMovie] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const context = useMyContext();

  if (!context) return <p>Context is unavailable</p>;
  const { likedMovies, addToFavourite, removeFromFavourite } = context;

  const fetchMovies = async (query1: string, query2:string, query3: string) => {
    if (!query1) return;
    setStatus("loading");

    const res = await fetch(`https://www.omdbapi.com/?s=${query1}&type=${query2}&y=${query3}&apikey=16c8cb0e`);
    const data = await res.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
    setStatus("done");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchMovies(searchMovie, searchType, searchYear);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchMovie"
          placeholder="Search by movie name"
          value={searchMovie}
          onChange={(e) => setSearchMovie(e.target.value)}
        />
        <input type="text"
          name="searchYear"
          placeholder="Search by year"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <select
          name="searchType"
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="">All type</option>
          <option value="movie">Movie</option>
          <option value="series">Series</option>
          <option value="episode">Episode</option>
        </select>
        <button type="submit">Find</button>
      </form>
      
      {status === "idle" && null}
      {status === "loading" && <p>Loading...</p>}
      {status === "done" && movies.length === 0 && <p>Nothing found</p>}
      {status === "done" && movies.length > 0 && (
        movies.map((movie) => {
          const isLike = likedMovies.some((m: Movie) => m.imdbID === movie.imdbID);
          return (
            <ul key={movie.imdbID}>
              <li>
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
                  {isLike ? "❤️" : "🤍"}
                </span>
              </li>
              <li>
                <NavLink to={`/movies/${movie.imdbID}`}>
                  <img src={movie.Poster} alt={movie.Title} />
                </NavLink>
              </li>
            </ul>
          );
        })
      )}
    </div>
  );
}