import { useLocation } from 'react-router-dom';
import '../VideoPlayer/VideoPlayer.css';
import React, { useState, useEffect } from 'react';

import { FaChevronLeft, FaPlayCircle } from 'react-icons/fa';

//TODO:: VIDEOPLAYER MUST BE HERE CURRENTLY IT IS JUST A PLACEHOLDER
export const VideoPlayer = ({ imageThumbnail }) => {

    return (
        <div className="videoPlayerWrapper">
            <img src={imageThumbnail} alt={"name"} className='videoPlayerContainer' />
            <div className="overlayContainer"></div>
            <FaPlayCircle className="playButton" size={64} color='white' />
        </div>
    );
};
