import React, { createContext, useContext, useEffect, useState } from "react";
import type { Movie, AppContextType } from "../libs/type";

const AppContext = createContext<AppContextType | null>(null)

export default function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [likedMovies, setLikeMovies] = useState<Movie[]>(() => {
        try {
            const stored = localStorage.getItem("likedMovies");
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.log("Error parsing likedMovies from localStorage", error);
            return [];
        }
    });


    useEffect(() => {
        localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
    }, [likedMovies]);

    const addToFavourite = async (movie: Movie) => {
        try {
            const res = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=16c8cb0e`);
            const fullMovie = await res.json();
            setLikeMovies((prev) =>
                prev.some((m) => m.imdbID === fullMovie.imdbID)
                    ? prev
                    : [...prev, fullMovie]
            );
        } catch (error) {
            console.error("Error fetching movie details", error);
        }
    };


    const removeFromFavourite = (movie: string) => {
        console.log("Removing from favourites", movie);
        setLikeMovies((prev) => prev.filter((m: Movie) => m.imdbID !== movie))
    };

    return (
        <AppContext.Provider value={{ likedMovies, addToFavourite, removeFromFavourite }} >
            {children}
        </AppContext.Provider>
    )
}

export function useMyContext() {
    return useContext(AppContext)
}