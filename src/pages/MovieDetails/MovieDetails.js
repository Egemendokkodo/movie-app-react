import { useLocation } from 'react-router-dom';

export const MovieDetails = () => {
    const location = useLocation();
    const movieId = location.state?.movieId;
    
    return (
        <div>
            <p>Film ID: {movieId}</p>
        </div>
    )
}