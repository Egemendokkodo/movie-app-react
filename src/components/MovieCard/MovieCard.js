import React, { useState } from 'react';
import { FaStar, FaComment } from 'react-icons/fa';
import './MovieCard.css'; // Import your CSS file

const MovieCard = ({ 
  borderRadius, 
  image, 
  year, 
  commentCount, 
  imdbRate, 
  name, 
  watchOptions,
  tags,
  details 
}) => {
  const [isHovered, setIsHovered] = useState(false);


  const movieCardStyle = {
    borderRadius: borderRadius || '0px',
  };

  const formattedWatchOptions = watchOptions.map(option => option.name).join(', ');
  const shortDescription = details.description.length > 200 
    ? details.description.substring(0, 200) + '...' 
    : details.description;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div  
      className="movie-card-content"
      onMouseEnter={handleMouseEnter} 
      onMouseLeave={handleMouseLeave}
    >
      <div className="movie-card" style={movieCardStyle}>
        <img src={image} alt={name} />
        <div className="overlay">
          <div className="info">
            <span style={{ color: "#b5b5b5" }}>{year}</span>
            <span style={{ margin: '0 5px', color: "#b5b5b5" }}>
              <FaComment style={{ fontSize: '8px', verticalAlign: 'middle' }} /> {commentCount}
            </span>
            <span style={{ color: "#ffd700" }}>
              <FaStar style={{ color: 'gold', fontSize: '8px', verticalAlign: 'middle' }} /> {imdbRate}
            </span>
          </div>
          <b className="movie-name">{name}</b>
          <p className="watch-option">{formattedWatchOptions}</p> 
        </div>
      </div>

      <div 
        className={`tooltip ${isHovered ? 'show' : ''}`}
        style={{
          top: '50%', // Center vertically relative to the card
          left: '100%', // Position to the right of the card
          transform: 'translateY(-50%)', // Center vertically
        }}
      >
        <h4 style={{ margin: '0', fontSize: '16px' }}>{name}</h4>
        <p style={{ margin: '5px 0' }}><FaStar color='gold' /> {imdbRate}</p>
        <p style={{ margin: '0' }}><strong>Summary</strong></p>
        <p style={{ margin: '0', marginTop: "5px", marginBottom: "10px" }}>{shortDescription}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {tags.map(tag => (
            <span key={tag.tagId} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
        <p style={{ margin: '0' }}><strong>Watch Options</strong></p>
        <p style={{ margin: '0', marginTop: "5px", marginBottom: "10px",fontSize:"12px" }}>{formattedWatchOptions}</p>
      </div>
    </div>
  );
};

export default MovieCard;
