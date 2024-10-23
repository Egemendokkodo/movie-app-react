import React, { useState, useEffect } from 'react';
import './TabBar.css';
import MovieCard from '../../components/MovieCard/MovieCard';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination';  // Yeni Pagination component'i

export const TabBar = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const tabs = [
        'Latest',
        "Editor's Choice",
        'Imdb 7+ Movies',
        'Most Commented',
        'Most Liked'
    ];

    const fetchMovies = async (page) => {
        setLoading(true);
        let response;
        try {
            if (activeTab === 0) {
                response = await axios.get(`http://localhost:8080/api/movie/get-all-movies?page=${page}&size=20`);
            } else {
                const tagIds = [31, 30, 34, 33];
                response = await axios.post(
                    `http://localhost:8080/api/movie/get-movies-by-tag-id?page=${page}&size=20`,
                    [tagIds[activeTab - 1]]
                );
            }
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
    }, [activeTab, currentPage]);

    return (
        <div className='container'>
            <div className='tab_box'>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab_btn ${activeTab === index ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(index);
                            setCurrentPage(0); 
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="loading_spinner">Loading...</div>
            ) : (
                <div>
                    <div className='content_box'>
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

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default TabBar;
