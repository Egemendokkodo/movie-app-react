import React, { useState } from 'react'; 
import { FaRobot, FaComment } from 'react-icons/fa';

const MovieRobotAndMovieRequest = () => {
  const [isHoveredRobot, setIsHoveredRobot] = useState(false);
  const [isHoveredMovieRequest, setIsHoveredMovieRequest] = useState(false);

  return (
    <div style={containerStyle}>
      <button
        style={isHoveredRobot ? {...buttonStyleRobot, ...hoverStyleRobot} : buttonStyleRobot}
        onMouseEnter={() => setIsHoveredRobot(true)}
        onMouseLeave={() => setIsHoveredRobot(false)}
      >
        <div style={textStyle}>
          <FaRobot size={24} /> 
          <span>Movie Robot</span>
        </div>
      </button>
      <button
        style={isHoveredMovieRequest ? {...buttonStyleMovieRequest, ...hoverStyleMovieRequest} : buttonStyleMovieRequest}
        onMouseEnter={() => setIsHoveredMovieRequest(true)}
        onMouseLeave={() => setIsHoveredMovieRequest(false)}
      >
        <div style={textStyle}>
          <FaComment size={24} /> 
          <span>Movie Request</span>
        </div>
      </button>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px', 
};

const buttonStyleRobot = {
  width: '100%', 
  maxWidth: '130px', 
  height: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px', 
  cursor: 'pointer',
  backgroundColor: '#dc2626', 
  border: 'none', 
  outline: 'none',
  paddingLeft:"20px",
  paddingRight:"20px",
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Initial shadow
};

const hoverStyleRobot = {
  backgroundColor: '#b91c1c', // Darker red on hover
  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
};

const buttonStyleMovieRequest = {
  width: '100%',
  maxWidth: '120px', 
  height: '80px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px', 
  cursor: 'pointer',
  backgroundColor: '#18181b', 
  border: 'none', 
  outline: 'none', 
  paddingLeft:"20px",
  paddingRight:"20px",
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease', // Smooth transition
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Initial shadow
};

const hoverStyleMovieRequest = {
  backgroundColor: '#27272a', // Lighter black on hover
  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)', // Deeper shadow on hover
};

const textStyle = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column', 
  alignItems: 'center', 
  color: "white",
  gap: "10px",
  fontWeight: "500",
};

export default MovieRobotAndMovieRequest;
