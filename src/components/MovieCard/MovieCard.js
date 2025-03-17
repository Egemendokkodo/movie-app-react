import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaStar, FaComment } from 'react-icons/fa';
import './MovieCard.css';


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
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const cardRef = useRef(null);

  const movieCardStyle = {
    borderRadius: borderRadius || '0px',
  };

  const formattedWatchOptions = watchOptions.map(option => option.name).join(', ');
  const shortDescription = details.description.length > 200 
    ? details.description.substring(0, 200) + '...' 
    : details.description;

  const handleMouseEnter = (e) => {
    setIsHovered(true);
    updateTooltipPosition(e);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    if (isHovered) {
      updateTooltipPosition(e);
    }
  };

  const updateTooltipPosition = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      
      // Tooltip'i kartın sağına yerleştir
      let left = rect.right + 3; // Kart sağından 10px uzaklık
      let top = rect.top;
      
      // Sağda yeterli alan yoksa sola yerleştir
      if (left + 250 > window.innerWidth) {
        left = rect.left - 260; // Tooltip genişliği + boşluk
      }
      
      // Tooltip'in ekranın altından taşmamasını sağla
      if (top + 300 > window.innerHeight) {
        top = window.innerHeight - 310;
      }
      
      setTooltipPosition({ top, left });
    }
  };

  useEffect(() => {
    // Pencere boyutu değiştiğinde tooltip pozisyonunu güncelle
    const handleResize = () => {
      if (isHovered && cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        updateTooltipPosition({ clientX: rect.right, clientY: rect.top });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isHovered]);

  return (
    <div>
      <div  
        className="movie-card-content"
        ref={cardRef}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
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
      </div>

      {isHovered && ReactDOM.createPortal(
        <div 
          className="tooltip show"
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          <h4 style={{ margin: '0', fontSize: '16px' }}>{name}</h4>
          <p style={{ margin: '5px 0' }}><FaStar color='gold' /> {imdbRate}</p>
          <p style={{ margin: '0' }}><strong>Summary</strong></p>
          <p style={{ margin: '0', marginTop: "5px", marginBottom: "10px" ,color:"#b5b5b5"}}>{shortDescription}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <span key={tag.tagId} className="tag">
                {tag.name}
              </span>
            ))}
          </div>
          <p style={{ margin: '0' }}><strong>Watch Options</strong></p>
          <p style={{ margin: '0', marginTop: "5px", marginBottom: "10px", fontSize:"12px" ,color:"#b5b5b5"}}>{formattedWatchOptions}</p>
        </div>,
        document.body
      )}
    </div>
  );
};

export default MovieCard;
