import React from 'react';
import { FaRobot, FaComment } from 'react-icons/fa'; // İkonlar için react-icons kütüphanesinden FaRobot ve FaComment'i ekledik.

const MovieRobotAndMovieRequest = () => {
  return (
    <div style={{ display: 'flex' }}>
      <button style={buttonStyleRobot}>
        <div style={textStyle}>
          <FaRobot size={16} /> 
          <span>Movie Robot</span>
        </div>
      </button>
      <button style={buttonStyleMovieRequest}>
        <div style={textStyle}>
          <FaComment size={16} /> 
          <span>Movie Request</span>
        </div>
      </button>
    </div>
  );
};

const buttonStyleRobot = {
  width: '120px',
  height: '70px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 10px',
  
  borderRadius: '10px', 
  cursor: 'pointer',
  backgroundColor: '#dc2626', 
  border: 'none', // Kenarlık yok
  outline: 'none', // Dış kenarlık yok
  boxShadow: 'none', // Gölgelendirme yok
};

const buttonStyleMovieRequest = {
  width: '120px',
  height: '70px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  
  borderRadius: '10px', 
  cursor: 'pointer',
  backgroundColor: '#18181b', 
  border: 'none', // Kenarlık yok
  outline: 'none', // Dış kenarlık yok
  boxShadow: 'none', // Gölgelendirme yok
};

const textStyle = {
  textAlign: 'center', // Metni ortala
  display: 'flex',
  flexDirection: 'column', // İkon ve yazıyı dikey yerleştir
  alignItems: 'center', // Ortala
  color: "white",
  gap: "10px",
  fontWeight: "500"
};

export default MovieRobotAndMovieRequest;
