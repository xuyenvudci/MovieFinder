export type Movie = {
  Title: string;
  Year: string;
  Director: string;
  Runtime: string;
  imdbRating: string;
  imdbID: string;
  Poster: string;
};

export type AppContextType = {
    likedMovies: Movie[];
    addToFavourite: (movie: Movie) => void;
    removeFromFavourite: (id: string) => void;
};