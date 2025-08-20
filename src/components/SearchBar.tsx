import { useState } from 'react';
import styles from '../pages/home.module.css'
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [searchMovie, setSearchMovie] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchYear, setSearchYear] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?movie=${searchMovie}&type=${searchType}&year=${searchYear}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
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

      
    </div>
  );
}