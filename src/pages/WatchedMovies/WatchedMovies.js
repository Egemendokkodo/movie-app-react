import axios from 'axios';
import React, { useState, useEffect } from 'react'
import MovieRobotAndMovieRequest from '../../components/MovieRobotAndMovieRequest/MovieRobotAndMovieRequest';
import { MoviesByCategory } from '../../components/MoviesByCategory/MoviesByCategory';
import { Footer } from '../../components/Footer/Footer';
import { useAuth } from '../../AuthContext/AuthContext';
import MovieCard from '../../components/MovieCard/MovieCard';
import '../WatchedMovies/WatchedMovies.css'

export const WatchedMovies = () => {
  const { user, isLoggedIn } = useAuth();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUserMovies = async () => {
    // Return early if user is not logged in or user.id is not available
    if (!user || !user.id) {
      return;
    }
    
    setLoading(true);
    console.log('istek yapılıyor : http://localhost:8080/api/auth/watchlist/'+user.id)
    try {
      const response = await axios.get(`http://localhost:8080/api/auth/watchlist/${user.id}`);
      if (response && response.data.success) {
        setMovies(response.data.response || []);

      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]); // Set to empty array in case of error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserMovies();
  }, [user]); // Add user as dependency to prevent infinite loop

  return (
    <div>
      <div className='pageContent'>
        <div className='movie-containers'>
          <p className='watched-movies-page-title'>Watched Movies</p>
          <div className='content_box_discover_page'>
            {loading ? (
              <div>Loading...</div>
            ) : movies && movies.length > 0 ? (
              movies.map((movie, index) => (
                <div className='content' key={index}>
                  <MovieCard
                    commentCount={movie.movieTotalCommentCount}
                    image={movie.movieImage}
                    imdbRate={movie.movieImdbRate}
                    name={movie.name}
                    year={movie.movieReleaseYear}
                    watchOptions={movie.watchOptions}
                    borderRadius={15}
                    tags={movie.tags}
                    details={movie.movieDetails}
                    movieId={movie.movieId}
                  />
                </div>
              ))
            ) : (
              <div>No watched movies found.</div>
            )}
          </div>
        </div>
        <div className='endColumn'>
          <MovieRobotAndMovieRequest></MovieRobotAndMovieRequest>
          <MoviesByCategory></MoviesByCategory>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};