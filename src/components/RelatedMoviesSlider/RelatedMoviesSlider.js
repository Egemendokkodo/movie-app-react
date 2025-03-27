

import '../../components/RelatedMoviesSlider/RelatedMoviesSlider.css';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from '../../components/MovieCard/MovieCard';
export const RelatedMoviesSlider = ({ tagList, maxLength, showChevrons }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState([]);
  //this must be maxlength * 2  
  const maxMovies = maxLength * 2;

  useEffect(() => {
    if (!tagList || tagList.length === 0) {
      return;
    }

    // tagList'ten sadece tagId'leri çıkar
    const tagIds = tagList.map(tag => tag.tagId);

    // POST isteği için gerekli ayarlar
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tagIds)  // Sadece ID'leri gönder
    };

    fetch('http://localhost:8080/api/movie/get-movies-by-tag-id?page=0&size=' + maxMovies, requestOptions)
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
  }, [tagList, maxMovies]);


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
            style={{ width: `${150 / maxLength}%` }}
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
              movieId={movie.movieId}
              borderRadius={20}
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


export default RelatedMoviesSlider