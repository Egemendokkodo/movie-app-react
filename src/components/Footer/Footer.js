import React from 'react';
import './Footer.css';
import applogo from '../../images/app-logo.png';
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div>
            <div className='footerDivider'></div>
            <div className='footerInside'>
                <div className='appLogoContainer'>
                    <Link to="/">
                        <img src={applogo} />
                        <span className="appName">Movie App</span>
                    </Link>
                </div>
                <div className='helpContainer'>
                    <p className='titleHelp'>Help</p>
                    <p className='titleHelpSubOptions'>Contact</p>
                    <p className='titleHelpSubOptions'>Twitter</p>
                    <p className='titleHelpSubOptions'>Instagram</p>
                </div>
            </div>
            <div className='footerDivider2'></div>
            <div className='footerTextContent'>
                <p className='footerText'>
                    <strong>Movie App</strong>, Created by Egemen Sevgi
                    <a style={{color:"#1976d2"}} href='https://www.linkedin.com/in/egemen-sevgi-813925206/' target="_blank" rel="noopener noreferrer"> My LinkedIn</a> in 2024.
                    Check backend of this project to run the project properly:
                    <a style={{color:"#1976d2"}} href='https://github.com/Egemendokkodo/movie_app_backend_spring_postgresql' target="_blank" rel="noopener noreferrer"> Backend of this project</a>
                </p>
            </div>

        </div>
    );
}
