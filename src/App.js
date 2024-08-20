import { useState, useEffect } from "react";
import "./App.css";
import Search from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "https://www.omdbapi.com?apikey=d1ace9a1";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };
  useEffect(() => {
    searchMovies('Avengers');
  }, []);

  return (
    <div className="app">
      <h1>MovieFinder</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={Search}
          alt="Search Icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <>
          <div className="container">
            {movies.map((movie) => (
              <MovieCard movie={movie} />
            ))}
            <MovieCard movie={movies[0]} />
          </div>
        </>
      ) : (
        <>
          <div className="empty">
            <h2>No movies found...</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
