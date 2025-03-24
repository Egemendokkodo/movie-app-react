import { useLocation } from 'react-router-dom';
import '../MovieDetails/MovieDetails.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaInfo, FaVolumeUp } from 'react-icons/fa';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';




export const MovieDetails = () => {
    const location = useLocation();
    const movieId = location.state?.movieId;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
            {movie && (<div className='movieDetailsPagePadding' >
                <div >
                    <div className='infoContainer'><p className='titleStyle2'>{movie.name} | Movie Details</p> <div className='infoButton'><FaInfo></FaInfo></div> </div>
                    <div className='movieDetailsRow'>
                        <img src={movie.movieImage} alt={"name"} className='movieImage' />
                        <div className='detailsContainer'>
                        <p className='descriptionText'>{movie.movieDetails.description}</p>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );


};
