import { Route, Routes } from "react-router-dom"
import { lazy } from "react"
import Layout from "./Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import MovieCard from "./components/MovieCard";
import Favourite from "./pages/Favourite";
import PageNotFound from "./pages/PageNotFound";
import SearchResult from "./pages/SearchResult";

const Movies = lazy(() => import("./pages/Movies"))

function App() {
  
  return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:id" element={<MovieCard />}/>
            <Route path="/contact" element={<Contact />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/search" element={<SearchResult />} />
            <Route path="*" element={<PageNotFound />} />
         </Route>
      </Routes>
  )
}

export default App
