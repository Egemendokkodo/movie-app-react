import { useLocation, useNavigate } from 'react-router-dom';
import '../MovieDetails/MovieDetails.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthContext';
import RelatedMoviesSlider from '../../components/RelatedMoviesSlider/RelatedMoviesSlider';
import { FaInfo, FaVolumeUp, FaImdb, FaExclamationCircle, FaEyeSlash, FaPlus, FaStar, FaFire, FaBolt, FaCommentDots,FaPaperPlane } from 'react-icons/fa';
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer';
import { Footer } from '../../components/Footer/Footer';
import StarRating from '../../components/StarRating/StarRating'
import Switch from '../../components/Switch/Switch'



export const MovieDetails = () => {
    const { user, isLoggedIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const movieId = location.state?.movieId;
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imdbRating, setImdbRating] = useState(null);
    const [voteCount, setVoteCount] = useState(null); // Oy sayısı için yeni state
    const [comment, setComment] = useState('');
    const [switchValue, setSwitchValue] = useState(false);

    const handleSwitchToggle = () => {
        setSwitchValue(!switchValue);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    
    const handleSentComment =()=>{
       
        if (comment) {
            console.log("comment yazılan : "+comment);
            console.log("switch value :"+switchValue)
        }
      
    }
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

    const handleTagClick = (tag, apiUrl) => {
        const title = `${tag.name} Movies`;
        const requestType = "POST";
        const tagId = tag.tagId;
        navigate(`/discover`, { state: { title, apiUrl, requestType, tagId } });
    };
    const handleYearClick = (year, apiUrl) => {
        const title = `${year} Movies`;
        navigate(`/discover`, { state: { title, apiUrl } });
    };

    const [rating, setRating] = useState(0);

    const handleRatingChange = (newRating) => {
        setRating(newRating);
        console.log(`Film puanı: ${newRating}/10`);
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
            {movie && <VideoPlayer imageThumbnail={movie.movieImage} movieId={movie.movieId} />}
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
                                            <div className='movieDetailBox' onClick={() => handleYearClick(movie.movieReleaseYear, "http://localhost:8080/api/movie/get-movie-by-year/" + movie.movieReleaseYear)}><p className='descriptionText'>{movie.movieReleaseYear}</p></div>
                                        </div>

                                        <div className='moreMovieDetailsContainer'>
                                            <p className='titleStyle2'>Category</p>
                                            <div className='spaceBetweenItems'></div>
                                            {movie.tags.map((tag, index) => (
                                                <div key={index} className='movieDetailBox' onClick={() => handleTagClick(tag, "http://localhost:8080/api/movie/get-movies-by-tag-id")}><p className='descriptionText'>{tag.name}</p></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='sizedBoxH'></div>
                            <div className='relatedToContainer'><p className='titleStyle2'>Movies Related to {movie.name}</p>
                                <FaBolt color='#ef4444' size={24}></FaBolt></div>
                            <div className='sizedBoxH'></div>
                            <RelatedMoviesSlider tagList={movie.tags} maxLength={6} showChevrons={true} />
                            <div className='sizedBoxH'></div>
                            <div className='relatedToContainer'>
                                <p className='titleStyle2'>Comments (0)</p>
                                <FaCommentDots color='#ef4444' size={24}></FaCommentDots>
                            </div>
                            <div className='sizedBoxH'></div>
                            {isLoggedIn ? (<div className='commentContainer'> <div className='sizedBoxH3'></div>
                                <input
                                    type="text"
                                    placeholder="Your thoughts"
                                    className="modal-input"
                                    value={comment}
                                    onChange={handleCommentChange}
                                />
                                <div className='sizedBoxH3'></div>
                                <div className='commentBottomContainer'>
                                    <div className='switchContainer'>
                                        <Switch
                                            isOn={switchValue}
                                            handleToggle={handleSwitchToggle}
                                            onColor="#06D6A0"
                                        />
                                        <p className='containSpoilerText'>Contains Spoiler</p>
                                    </div>
                                    <div className='sendCommentBtn'>
                                         <button className="rounded-button" onClick={handleSentComment}>
                                                                        
                                                                        <span className="button-text">Send Comment</span>
                                                                        <FaPaperPlane className="sendIcon" />
                                                                    </button>
                                    </div>
                                </div> <div className='sizedBoxH3'></div>
                            </div>) : (<div className='noLoginContainer'>
                                <div className='spaceBetweenItems'></div>
                                <FaExclamationCircle color='rgb(252 165 165 )' />
                                <div className='spaceBetweenItems'></div>
                                <p className='noLoginText'>Only registered users can comment.</p>
                            </div>)}

                        </div>

                        {/* Kenar çubuğu - %30 */}
                        <div className='sidebarContainer'>
                            <div className='sizedBoxH'></div>
                            <div className='sidebarButtonRow'>

                                <div className='sideBarContainer'>
                                    <FaEyeSlash color='white' size={24}></FaEyeSlash>
                                    <div className='sizedBoxH2'></div>
                                    <p className='titleStyle2'>Not Watched</p>

                                </div>
                                <div className='spaceBetweenItems'></div>
                                <div className='sideBarContainer'>
                                    <FaPlus color='white' size={24}></FaPlus>
                                    <div className='sizedBoxH2'></div>
                                    <p className='titleStyle2'>Follow</p>

                                </div>
                            </div>
                            <div className='sizedBoxH'></div>
                            <div className='websiteRatingTitle'>
                                <div className='starIconStyle'>
                                    <FaFire color='grey' size={24} style={{ verticalAlign: 'middle' }} />
                                </div>
                                <p className='titleStyle2'>Website Rating</p>
                            </div>
                            <div className='sizedBoxH2'></div>
                            <div className='sideBarContainer2'>
                                <div className='websiteRatingContainer'>
                                    <div className="iconContainer">
                                        <FaFire size={50} color='#ef4444'></FaFire>
                                    </div>
                                    <div className="ratingTextContainer">
                                        <div className="ratingValues">
                                            <p className='rateStyle'>{movie.movieDetails.websiteRating}</p>
                                            <p className='rateStyle2'>/ 10</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='sizedBoxH'></div>
                            <div className='websiteRatingTitle'>
                                <div className='starIconStyle'>
                                    <FaFire color='grey' size={24} style={{ verticalAlign: 'middle' }} />
                                </div>
                                <p className='titleStyle2'>Website Rating</p>

                            </div>
                            <div className='sizedBoxH2'></div>
                            <div className="sideBarContainer2"> <StarRating
                                initialRating={0}
                                readOnly={false}
                            /></div>

                        </div>
                    </div>

                    <div className='sizedBoxH'></div>


                </div>
            )}


            <Footer></Footer>
        </div>
    );
};
