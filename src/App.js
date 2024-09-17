import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieList from './components/MovieList';
import AddMovieForm from './components/AddMovieForm';
import Library from './components/Library';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [library, setLibrary] = useState([]);
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');

  // Check the value of isAuthenticated when logging in
  useEffect(() => {
    console.log('Authentication Status:', isAuthenticated);
  }, [isAuthenticated]);

  // Fetch the movie library from the backend (json-server) on page load
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const response = await fetch(`${API_URL}/movies`);
        const data = await response.json();
        setLibrary(data);
      } catch (error) {
        console.error('Error fetching library:', error);
      }
    };
    fetchLibrary();
  }, []);

  // Add movie to the library (json-server)
  const handleAddToLibrary = async (movie) => {
    try {
      const response = await fetch(`${API_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: movie.Title || movie.title,
          releaseDate: movie.Year || movie.releaseDate,
          poster: movie.Poster || movie.poster,
          imdbID: movie.imdbID || movie.id, // Store OMDb or local ID
        }),
      });

      if (response.ok) {
        const newMovie = await response.json();
        setLibrary((prevLibrary) => [...prevLibrary, newMovie]);
      } else {
        console.error('Failed to add movie to library');
      }
    } catch (error) {
      console.error('Error adding movie:', error);
    }
  };

  // Remove movie from library (json-server)
  const handleRemoveFromLibrary = async (movieId) => {
    try {
      const response = await fetch(`${API_URL}/movies/${movieId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLibrary((prevLibrary) =>
          prevLibrary.filter((movie) => movie.imdbID !== movieId && movie.id !== movieId)
        );
      } else {
        console.error('Failed to remove movie from library');
      }
    } catch (error) {
      console.error('Error removing movie:', error);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const fetchMoviesBySearch = () => {
    // Implement search functionality here
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className={`App ${theme}`}>
        <NavBar
          toggleTheme={toggleTheme}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          fetchMoviesBySearch={fetchMoviesBySearch}
        />
        <Routes>
          {/* Protected Routes */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <h2>Welcome to the Movie Library!</h2>
                  <MovieList
                    handleAddToLibrary={handleAddToLibrary}
                    library={library}
                    handleRemoveFromLibrary={handleRemoveFromLibrary}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/add-movie"
            element={isAuthenticated ? <AddMovieForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/library"
            element={
              isAuthenticated ? (
                <Library
                  library={library}
                  handleRemoveFromLibrary={handleRemoveFromLibrary}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Authentication Routes */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
