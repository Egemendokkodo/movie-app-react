import { useLocation } from 'react-router-dom';
import '../MovieDetails/MovieDetails.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInfo, FaVolumeUp, FaImdb,FaExclamationCircle } from 'react-icons/fa';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { Footer } from '../../components/Footer/Footer';
export const MovieDetails = () => {
    const location = useLocation();
    const movieId = location.state?.movieId;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imdbRating, setImdbRating] = useState(null);
    const [voteCount, setVoteCount] = useState(null); // Oy sayısı için yeni state

    const fetchMovies = async () => {
        if (!movieId) {
            setError("Film ID'si bulunamadı");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/movie/get-movie-by-id/${movieId}`);
            if (response && response.data.success) {
                // API yanıtı doğrudan response.data.response olarak geliyor, 'movies' alanı yok
                setMovie(response.data.response);

                // Film bilgisi geldikten sonra IMDB puanını al
                if (response.data.response.name) {
                    fetchImdbRating(response.data.response.name);
                }
            } else {
                setError("Film bilgileri alınamadı");
            }
        } catch (error) {
            console.error('Error fetching movie detail:', error);
            setError("Film detayları yüklenirken bir hata oluştu");
        } finally {
            setLoading(false);
        }
    };

    const fetchImdbRating = async (movieName) => {
        try {
            const encodedMovieName = encodeURIComponent(movieName);
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYmIyNjE1NjM5NWU0NTNhYzMxMmI4NmU4M2YzMWQ1YiIsIm5iZiI6MTc0MjkwNDE3MS40NTQwMDAyLCJzdWIiOiI2N2UyOWI2YmQ0MDUyZjQ3OTNkYzcyM2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.y4Hz25nbLN3_IJgF_JE4nJ0Zne1FppskBKs2y-kyU4M'
                }
            };

            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${encodedMovieName}&include_adult=false&language=en-US&page=1`,
                options
            );

            if (response.data && response.data.results && response.data.results.length > 0) {
                // İlk sonucu al ve IMDB puanını ve oy sayısını ayarla
                const rating = response.data.results[0].vote_average;
                const votes = response.data.results[0].vote_count;
                setImdbRating(rating);
                setVoteCount(votes);
            } else {
                console.log('Film bulunamadı veya puan bilgisi yok');
                setImdbRating('N/A');
                setVoteCount(0);
            }
        } catch (error) {
            console.error('IMDB puanı alınırken hata oluştu:', error);
            setImdbRating('N/A');
            setVoteCount(0);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, [movieId]); // Sadece movieId değiştiğinde çalışacak

    const [selectedItem, setSelectedItem] = useState(0);

    const handleItemClick = (index) => {
        setSelectedItem(index);
    };

    return (
        <div>
            <div className='movieDetailsPagePadding'>
                {error && <p>{error}</p>}
                {movie && (
                    <>
                        <div className='titleRow'>
                            <p className='titleStyle'>{movie.name}</p>
                            <p className='yearStyle'> ({movie.movieReleaseYear})</p>
                        </div>
                        <div className='watchOptionsContainer'>
                            <div className='iconContainer'>
                                <FaVolumeUp color='grey' />
                            </div>
                            {movie.watchOptions.map((watchOption, index) => (
                                <React.Fragment key={index}>
                                    {index > 0 && <span className="watchOptionsDivider">/</span>}
                                    <p className='watchOptionsItem'>{watchOption.name}</p>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className='sourcesContainer'>
                            <div
                                className={`selectableItem ${selectedItem === 0 ? 'selected' : ''}`}
                                onClick={() => handleItemClick(0)}
                            >
                                Source 1
                            </div>
                            <div
                                className={`selectableItem ${selectedItem === 1 ? 'selected' : ''}`}
                                onClick={() => handleItemClick(1)}
                            >
                                Source 2
                            </div>
                        </div>
                    </>
                )}
            </div>
            {movie && <VideoPlayer imageThumbnail={movie.movieImage} />}
            {movie && (
    <div className='movieDetailsPagePadding'>
        
        
       
        <div className='contentRow'>
            {/* Ana içerik - %70 */}
            
            <div className='mainContentContainer'>
            <div className='sizedBoxH'></div>
        <div className='infoContainer'>
            <p className='titleStyle2'>{movie.name} | Movie Details</p>
            <div className='infoButton'><FaInfo></FaInfo></div>
        </div>
        <div className='sizedBoxH'></div>
                <div className='movieDetailsRow'>
                    <img src={movie.movieImage} alt={"name"} className='movieImage' />
                    <div className='detailsContainer'>
                        <p className='descriptionText'>{movie.movieDetails.description}</p>

                        <div className='column'>
                            <div className='imdbContainer'>
                                <div className='imdbIcon'>
                                    <FaImdb size={52} color="#f5c518" />
                                </div>
                                <div className='spaceBetweenItems'></div>
                                <div className='imdbRatingContainer'>
                                    <p className='imdbTitle'>IMDb</p>
                                    <p className='imdbRating'>
                                        {loading ? 'Yükleniyor...' : imdbRating !== null ? Number(imdbRating).toFixed(1) : 'N/A'}
                                        {voteCount !== null && voteCount > 0 && <span className='voteCount'> ({voteCount} votes)</span>}
                                    </p>
                                </div>
                            </div>

                            <div className='moreMovieDetailsContainer'>
                                <p className='titleStyle2'>Time</p>
                                <div className='spaceBetweenItems'></div>
                                <p className='descriptionText'>{movie.movieDetails.movieLengthInMins} minutes</p>
                            </div>
                            <div className='moreMovieDetailsContainer'>
                                <p className='titleStyle2'>Total Watched</p>
                                <div className='spaceBetweenItems'></div>
                                <p className='descriptionText'>{movie.movieDetails.totalWatched}</p>
                            </div>

                            <div className='moreMovieDetailsContainer'>
                                <p className='titleStyle2'>Year</p>
                                <div className='spaceBetweenItems'></div>
                                <div className='movieDetailBox'><p className='descriptionText'>{movie.movieReleaseYear}</p></div>
                            </div>

                            <div className='moreMovieDetailsContainer'>
                                <p className='titleStyle2'>Category</p>
                                <div className='spaceBetweenItems'></div>
                                {movie.tags.map((tag, index) => (
                                    <div key={index} className='movieDetailBox'><p className='descriptionText'>{tag.name}</p></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sizedBoxH'></div>
                <p className='titleStyle2'>Comments (0)</p>
                <div className='sizedBoxH'></div>
                <div className='noLoginContainer'>
                    <div className='spaceBetweenItems'></div>
                    <FaExclamationCircle color='rgb(252 165 165 )' />
                    <div className='spaceBetweenItems'></div>
                    <p className='noLoginText'>Only registered users can comment.</p>
                </div>
            </div>
            
            {/* Kenar çubuğu - %30 */}
            <div className='sidebarContainer'>
                <p className='sidebarTitle'>Related Content</p>
                {/* Buraya ilgili içerikler eklenebilir */}
            </div>
        </div>
        
        <div className='sizedBoxH'></div>
    </div>
)}


            <Footer></Footer>
        </div>
    );
};
