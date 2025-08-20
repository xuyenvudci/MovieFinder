import { useState, useEffect } from "react";
import { useMyContext } from "../context/AppContext";
import type { Movie } from "../libs/type";
import styles from "../pages/home.module.css";
import { useSearchParams, NavLink } from "react-router-dom";
import SearchBar from "../components/SearchBar";

type Status = "idle" | "loading" | "done";

export default function SearchResult() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const context = useMyContext();
  const [searchParams] = useSearchParams();

  const searchMovie = searchParams.get("movie") || "";
  const searchType = searchParams.get("type") || "";
  const searchYear = searchParams.get("year") || "";

  if (!context) return <p>Context is unavailable</p>;
  const { likedMovies, addToFavourite, removeFromFavourite } = context;

  useEffect(() => {
    if (!searchMovie) return;

    const fetchMovies = async () => {
      setStatus("loading");
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?s=${searchMovie}&type=${searchType}&y=${searchYear}&apikey=16c8cb0e`
        );
        const data = await res.json();
        setMovies(data.Search || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setMovies([]);
      }
      setStatus("done");
    };

    fetchMovies();
  }, [searchMovie, searchType, searchYear]);

  return (
    <>
      {status === "idle" && null}
      {status === "loading" && <p>Loading...</p>}
      {status === "done" && movies.length === 0 && <p>Nothing found</p>}

      {status === "done" && movies.length > 0 && (
        <div className={styles.container}>
          {<SearchBar />}
          <div className={styles.movieGrid}>
            {movies.map((movie) => {
              const isLike = likedMovies.some(
                (m: Movie) => m.imdbID === movie.imdbID
              );

              return (
                <div key={movie.imdbID} className={styles.movieCard}>
                  <NavLink to={`/movies/${movie.imdbID}`}>
                    <img src={movie.Poster} alt={movie.Title} />
                  </NavLink>
                  <div className={styles.movieInfo}>
                    <NavLink to={`/movies/${movie.imdbID}`}>
                      <h3>
                        {movie.Title} ({movie.Year})
                      </h3>
                    </NavLink>
                    <span
                      className={styles.like}
                      onClick={() =>
                        isLike
                          ? removeFromFavourite(movie.imdbID)
                          : addToFavourite(movie)
                      }
                    >
                      {isLike ? "❤️" : "🤍"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
