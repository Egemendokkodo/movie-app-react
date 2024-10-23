import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Home.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { TabBar } from '../../components/TabBar/TabBar';
import MovieRobotAndMovieRequest from '../../components/MovieRobotAndMovieRequest/MovieRobotAndMovieRequest';
import { MoviesByCategory } from '../../components/MoviesByCategory/MoviesByCategory';

export const HomePage = () => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/movie/get-all-movies?page=1&size=12')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // Gelen veriyi inceleyelim
        if (data.success) {
          setMovies(data.response.movies);  // movies dizisine verileri atıyoruz
          console.log("VERILER BAŞARIYLA GELDI");
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleNext = () => {
    if (currentIndex < movies.length - 6) {
      setCurrentIndex(currentIndex + 6);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 6);
    }
  };

  return (
    <div>
      <div className='homePageStyle'>
        <div className='navButtonContainer'>
          <button className='navButton' onClick={handlePrev} disabled={currentIndex === 0}>
            <FaChevronLeft className='chevron'></FaChevronLeft>
          </button>
        </div>
        {movies.slice(currentIndex, currentIndex + 6).map((movie, index) => (
          <MovieCard
            key={index}
            commentCount={movie.movieTotalCommentCount}
            image={movie.movieImage}
            imdbRate={movie.movieImdbRate}
            name={movie.name}
            year={movie.movieReleaseYear}
            watchOptions={movie.watchOptions}
          />
        ))}
        <div className='navButtonContainer'>
          <button className='navButton' onClick={handleNext} disabled={currentIndex >= movies.length - 6}>
            <FaChevronRight className='chevron'></FaChevronRight>
          </button>
        </div>
      </div>
      <div className='pageContent'>
        <TabBar></TabBar>
        <div className='endColumn'>
          <MovieRobotAndMovieRequest></MovieRobotAndMovieRequest>
          <MoviesByCategory></MoviesByCategory>
        </div>
      </div>
    </div>
  );
};
