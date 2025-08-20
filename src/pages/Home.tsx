import SearchBar from "../components/SearchBar";
import styles from './home.module.css'
import { Slider } from '../components/Slider'


export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.welcome}>
        <h1>Welcome to Movie Finder Page</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo voluptatum molestias rerum atque, quo dignissimos.</p>
      </div>
      <SearchBar />
      <div className={styles.red}>

        <h2 className={styles.corection}>Love</h2>
        <hr className={styles.hr} />

        <Slider searchTerm="love" title="War Movies" />
        <Slider searchTerm="comedy" title="Comedy Movies" />
        <Slider searchTerm="action" title="Action Movies" />
      </div>
    </div>
  )
}
