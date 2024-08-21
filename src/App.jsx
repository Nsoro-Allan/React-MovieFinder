import { useState, useEffect } from "react";
import "./App.css";
import MovieIcon from "./icon.svg";
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1><a href="./"><img className="icon" src={MovieIcon} alt="MovieFinder Icon" /> MovieFinder</a></h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key press
        />
        <img
          src={Search}
          alt="Search Icon"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found...</h2>
        </div>
      )}
    </div>
  );
};

export default App;
