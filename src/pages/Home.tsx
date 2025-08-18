import SearchBar from "../components/SearchBar";
import  styles from './home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
        <h1>Welcome to Movie Finder Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatum molestias rerum atque, quo dignissimos.</p>
        <SearchBar />
    </div>
  )
}
