

import React, { useEffect, useState } from 'react';
import styles from './Slider.module.css';
import { NavLink } from 'react-router-dom';

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Year: string;
};

const VISIBLE_SLIDES = 3;  

export const Slider: React.FC<{ searchTerm: string; title: string }> = ({ searchTerm, title }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=16c8cb0e`);
        const data = await response.json();
        setMovies(data.Search || []);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
      setCurrent(0); 
    }
    fetchMovies();
  }, [searchTerm]);

  const length = movies.length;

  if (loading) return <p>Loading movies...</p>;
  if (length === 0) return <p>No movies found.</p>;

  
  const maxIndex = length - VISIBLE_SLIDES < 0 ? 0 : length - VISIBLE_SLIDES;

  const nextSlide = () => setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prevSlide = () => setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <div className={styles.sliderContainer}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.sliderWrapper}>
        <button onClick={prevSlide} className={styles.arrowLeft} aria-label="Previous Slide">
          &#10094;
        </button>

        <div className={styles.sliderTrack} style={{ transform: `translateX(-${current * (100 / VISIBLE_SLIDES)}%)` }}>
          {movies.map((movie) => (
            <div className={styles.slide} key={movie.imdbID}>
              <NavLink to={`/movies/${movie.imdbID}`}>
                <img src={movie.Poster} alt={movie.Title} className={styles.image} />
                <p className={styles.movieTitle}>
                  {movie.Title} ({movie.Year})
                </p>
              </NavLink>
            </div>
          ))}
        </div>

        <button onClick={nextSlide} className={styles.arrowRight} aria-label="Next Slide">
          &#10095;
        </button>
      </div>
    </div>
  );
};
