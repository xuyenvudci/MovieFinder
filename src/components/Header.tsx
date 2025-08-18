import { NavLink } from 'react-router-dom'
import { useMyContext } from '../context/AppContext';

export default function Header() {
  const { likedMovies } = useMyContext() ?? {};
  if (!likedMovies) return <p>Context not available</p>;
  return (
    <header>
        <nav>
            <NavLink className={({isActive}) => (isActive ? "active-link" : "inactive-link")} to="/">Home</NavLink>
            <NavLink className={({isActive}) => (isActive ? "active-link" : "inactive-link")} to="/movies">Movies</NavLink>
            <NavLink className={({isActive}) => (isActive ? "active-link" : "inactive-link")} to="/contact">Contact</NavLink>
            <NavLink className={({isActive}) => (isActive ? "active-link" : "inactive-link")} to="/favourite">Favourite ({likedMovies.length})</NavLink>
        </nav>
    </header>
  )
}
