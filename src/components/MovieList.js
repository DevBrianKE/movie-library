import React, { useState, useEffect } from 'react';
import './MovieList.css';
import Slideshow from './Slideshow'; // Import Slideshow component

const MovieList = ({ handleAddToLibrary, library, handleRemoveFromLibrary }) => {
  const [movies, setMovies] = useState([]); 
  const [localMovies, setLocalMovies] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const API_KEY = '9e92c4e4';
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Fetch movies from OMDb and json-server
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        // Fetch movies from OMDb API
        const response = await fetch(`https://www.omdbapi.com/?s=avengers&type=movie&apikey=${API_KEY}`);
        const data = await response.json();

        if (data.Response === 'True') {
          const omdbMovies = data.Search;

          // Fetch movies from json-server
          const localResponse = await fetch(`${API_URL}/movies`);
          const localData = await localResponse.json();

          setLocalMovies(localData); 
          setMovies([...omdbMovies, ...localData]);
        } else {
          setError(data.Error);
        }
      } catch (error) {
        setError('Error fetching movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [API_KEY, API_URL]); // Adding missing dependencies

  // Fetch movies based on search query
  const fetchMoviesBySearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a movie name to search!');
      return;
    }

    setLoading(true);
    setError(''); 
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&type=movie&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        setMovies([...data.Search, ...localMovies]); 
            } else {
        setError(data.Error);
      }
    } catch (error) {
      setError('Error fetching movies');
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main">
      <h2>Movie List</h2>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button className="search-btn" onClick={fetchMoviesBySearch}>
          Search
        </button>
      </div>

      {/* Slideshow at the top of the page */}
      <Slideshow movies={movies} />

      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="movie-grid">
            {currentMovies.map((movie) => (
              <div
                className="movie-tile"
                key={movie.imdbID || movie.id} 
              >
                <h3>{movie.Title || movie.title}</h3>
                <p>{movie.Year || movie.releaseDate}</p>
                <img src={movie.Poster || movie.poster} alt={`${movie.Title || movie.title} Poster`} width="100" />
                <button
                  className="add-to-library-btn"
                  onClick={() => handleAddToLibrary(movie)}
                >
                  Add to Library
                </button>
              </div>
            ))}
          </div>
          <div className="pagination">
            {Array.from({ length: Math.ceil(movies.length / moviesPerPage) }).map((_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieList;
