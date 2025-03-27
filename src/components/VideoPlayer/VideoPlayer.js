import { useLocation } from 'react-router-dom';
import '../VideoPlayer/VideoPlayer.css';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext/AuthContext';
import { FaChevronLeft, FaPlayCircle } from 'react-icons/fa';

//TODO:: VIDEOPLAYER MUST BE HERE CURRENTLY IT IS JUST A PLACEHOLDER
export const VideoPlayer = ({ imageThumbnail, movieId }) => {
    const { user, isLoggedIn } = useAuth();
    const [isWatched, setIsWatched] = useState(false);

    const handlePlayClick = async () => {
        if (isLoggedIn && user && movieId) {
            try {
                const response = await fetch(`http://localhost:8080/api/movie/${movieId}/watch?userId=${user.id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                const result = await response.json();
                
                if (result === true) {
                    console.log('Film izlenme sayısı artırıldı');
                    setIsWatched(true);
                } else {
                    console.log('Bu film daha önce izlenmiş');
                }
                
                // Videoyu oynatma işlemi burada yapılabilir
                // Örneğin: videoRef.current.play();
                
            } catch (error) {
                console.error('Film izleme kaydı yapılırken hata oluştu:', error);
            }
        } else {
            console.log('Video oynatmak için giriş yapmalısınız');
            // Kullanıcı giriş yapmamışsa, giriş sayfasına yönlendirme veya modal gösterme işlemi
        }
    };

    return (
        <div className="videoPlayerWrapper">
            <img src={imageThumbnail} alt={"name"} className='videoPlayerContainer' />
            <div className="overlayContainer"></div>
            <FaPlayCircle 
                className="playButton" 
                size={64} 
                color={isWatched ? 'gray' : 'white'} 
                onClick={handlePlayClick}
            />
        </div>
    );
};
