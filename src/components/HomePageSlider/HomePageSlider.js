import React, { useState, useEffect } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import '../../pages/HomePage/Home.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomepageSlider = ({
   maxLength = 6, // Bir sayfada gösterilecek film sayısı
   showChevrons = true, // Varsayılan olarak okları göster
}) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  //this must be maxlength * 2  
  const maxMovies = maxLength * 2;
  
  useEffect(() => {
    fetch('http://localhost:8080/api/movie/get-all-movies?page=1&size=' + maxMovies)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setMovies(data.response.movies);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [maxMovies]);


  const handleNext = () => {
    if (currentIndex < movies.length - maxLength) {
      setCurrentIndex(currentIndex + maxLength);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - maxLength);
    }
  };

  return (
    <div className='slider-container'>
      {showChevrons && (
        <div className='navButtonContainer left-nav'>
          <button 
            className='navButton' 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
          >
            <FaChevronLeft className='chevron' />
          </button>
        </div>
      )}
      
      <div className="movies-row">
        {movies.slice(currentIndex, currentIndex + maxLength).map((movie, index) => (
          <div 
            className="slider-item" 
            style={{ width: `${100 / maxLength}%` }}
            key={movie.id || index}
          >
            <MovieCard
              commentCount={movie.movieTotalCommentCount}
              image={movie.movieImage}
              imdbRate={movie.movieImdbRate}
              name={movie.name}
              year={movie.movieReleaseYear}
              watchOptions={movie.watchOptions}
              tags={movie.tags}
              details={movie.movieDetails}
            />
          </div>
        ))}
      </div>

      {showChevrons && (
        <div className='navButtonContainer right-nav'>
          <button 
            className='navButton' 
            onClick={handleNext} 
            disabled={currentIndex >= movies.length - maxLength}
          >
            <FaChevronRight className='chevron' />
          </button>
        </div>
      )}
    </div>
  );
}

export default HomepageSlider;
