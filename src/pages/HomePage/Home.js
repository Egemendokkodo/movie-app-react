import React, { useState } from 'react';
import MovieCard from '../../components/MovieCard/MovieCard';
import './Home.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
export const HomePage = () => {
  const movieCards = [
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Ters yüz 2", year: 2024, imdbRate: 7.2, commentCount: 0, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 2", year: 2023, imdbRate: 8.0, commentCount: 10, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 3", year: 2022, imdbRate: 6.5, commentCount: 5, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 4", year: 2021, imdbRate: 9.0, commentCount: 20, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 5", year: 2020, imdbRate: 7.5, commentCount: 8, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 6", year: 2019, imdbRate: 8.5, commentCount: 12, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 7", year: 2018, imdbRate: 7.9, commentCount: 4, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 8", year: 2017, imdbRate: 6.8, commentCount: 2, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 9", year: 2020, imdbRate: 7.5, commentCount: 8, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 10", year: 2019, imdbRate: 8.5, commentCount: 12, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 11", year: 2018, imdbRate: 7.9, commentCount: 4, watchOptions: ["Türkçe Dublaj"] },
    { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 12", year: 2017, imdbRate: 6.8, commentCount: 2, watchOptions: ["Türkçe Dublaj"] },


  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < movieCards.length - 6) {
      setCurrentIndex(currentIndex + 6);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 6);
    }
  };

  return (
    <div className='homePageStyle'>
      <div className='navButtonContainer'>
        <button className='navButton' onClick={handlePrev} disabled={currentIndex === 0}>
          <FaChevronLeft className='chevron'
          ></FaChevronLeft>
        </button>
      </div>
      <div className='movieCardsContainer'>
        {movieCards.slice(currentIndex, currentIndex + 6).map((movie, index) => (
          <MovieCard
            key={index}
            commentCount={movie.commentCount}
            image={movie.image}
            imdbRate={movie.imdbRate}
            name={movie.name}
            year={movie.year}
            watchOptions={movie.watchOptions}
          />
        ))}
      </div>
      <div className='navButtonContainer'>
        <button className='navButton' onClick={handleNext} disabled={currentIndex >= movieCards.length - 6}>
          <FaChevronRight className='chevron'
          ></FaChevronRight>
        </button>
      </div>
      
    </div>
    
  );
};
