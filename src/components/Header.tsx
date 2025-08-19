import { NavLink } from 'react-router-dom'
import { useMyContext } from '../context/AppContext';
import styles from './Header.module.css'

export default function Header() {
  const { likedMovies } = useMyContext() ?? {};
  if (!likedMovies) return <p>Context not available</p>;
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink className={({ isActive }) => (isActive ? styles.activelink : styles.inactivelink)}
          to="/"> Home</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activelink : styles.inactivelink)}
          to="/movies">Movies</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activelink : styles.inactivelink)}
          to="/contact">Contact</NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.activelink : styles.inactivelink)}
          to="/favourite">Favourite
          {likedMovies.length > 0 && <span style={{ position: 'absolute', right: '0rem', top: '0rem' }}>{likedMovies.length}
          </span>} </NavLink>
      </nav>
    </header>
  )
}
