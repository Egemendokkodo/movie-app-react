import React from 'react';
import { FaStar, FaComment } from 'react-icons/fa';

const MovieCard = ({ 
  borderRadius, 
  image, 
  year, 
  commentCount, 
  imdbRate, 
  name, 
  watchOptions 
}) => {
  const movieCardStyle = {
    width: '180px',
    height: '250px',
    borderRadius: borderRadius || '0px',
    overflow: 'hidden',
    position: 'relative',
    transition: 'transform 0.3s ease', // Transition for the card
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    left: '0',
    transition: 'transform 0.3s ease', // Transition for the image
  };

  const overlayStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    padding: '5px 10px',
    justifyContent: 'flex-end',
  };

  const infoStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '11px',
    marginBottom: '2px',
  };

  const movieNameStyle = {
    marginBottom: '2px',
    fontWeight: 'bold',
    fontSize: '14px',
  };

  const watchOptionStyle = {
    fontSize: '11px',
    padding: 0,
    margin: "0",
  };

  return (
    <div 
      style={movieCardStyle} 
      onMouseEnter={(e) => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1.1)'; // Scale up the image
      }} 
      onMouseLeave={(e) => {
        e.currentTarget.querySelector('img').style.transform = 'scale(1)'; // Scale back down
      }}
    >
      <img src={image} alt={name} style={imageStyle} />
      <div style={overlayStyle}>
        <div style={infoStyle}>
          <span style={{ color: "#b5b5b5" }}>{year}</span>
          <span style={{ margin: '0 5px', color: "#b5b5b5" }}>
            <FaComment style={{ fontSize: '8px', verticalAlign: 'middle' }} /> {commentCount}
          </span>
          <span style={{ color: "#ffd700" }}>
            <FaStar style={{ color: 'gold', fontSize: '8px', verticalAlign: 'middle' }} /> {imdbRate}
          </span>
        </div>
        <b style={movieNameStyle}>{name}</b>
        <p style={watchOptionStyle}>{watchOptions.join(', ')}</p>
      </div>
    </div>
  );
};

export default MovieCard;
