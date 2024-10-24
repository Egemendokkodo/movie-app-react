import React, { useState, useEffect } from 'react'
import './Discover.css'
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';
import MovieCard from '../../components/MovieCard/MovieCard';
import MovieRobotAndMovieRequest from '../../components/MovieRobotAndMovieRequest/MovieRobotAndMovieRequest';
import { MoviesByCategory } from '../../components/MoviesByCategory/MoviesByCategory';
import { Footer } from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';


export const DiscoverPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
   
  const { title, apiUrl = 'http://localhost:8080/api/movie/get-all-movies' } = location.state || {};

  const fetchMovies = async (page) => {
    setLoading(true);
    try {
      console.log("URL BURADA :" + `${apiUrl}?page=${page}&size=20`);
      const response = await axios.get(`${apiUrl}?page=${page}&size=20`);
      if (response && response.data.success) {
        setMovies(response.data.response.movies);
        setTotalPages(response.data.response.totalPages);
        setCurrentPage(response.data.response.currentPage);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  return (
    <div className='discoverPageContainer'>
      <div className='discoverPageTitle'> {title == null ? ("Discover") : (title)}</div>

      <div className='discoverPageContent'>
        <div>
          <div className='content_box_discover_page'>
            {movies.map((movie, index) => (
              <div className='content' key={index}>
                <MovieCard
                  commentCount={movie.movieTotalCommentCount}
                  image={movie.movieImage}
                  imdbRate={movie.movieImdbRate}
                  name={movie.name}
                  year={movie.movieReleaseYear}
                  watchOptions={movie.watchOptions}
                  borderRadius={15}
                  tags={movie.tags}  // Pass tags as a prop
                  details={movie.movieDetails}  // Pass movie details as a prop
                />
              </div>
            ))}
          </div>

          <div className='discoverPagePaginationContainer'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>














        <div className='endColumnDiscoverPage'>
          <MovieRobotAndMovieRequest></MovieRobotAndMovieRequest>
          <MoviesByCategory></MoviesByCategory>
        </div>


      </div>
      <Footer></Footer>

    </div>
  );
}
