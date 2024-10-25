import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import applogo from '../../images/app-logo.png';
import { FaSignInAlt, FaSearch, FaHome, FaChevronDown, FaChevronUp } from 'react-icons/fa';

export const Navbar = () => {
    const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
    const navigate = useNavigate(); 

    const toggleYearDropdown = () => {
        setIsYearDropdownVisible(!isYearDropdownVisible);
    };

    const handleYearClick = (year, apiUrl) => {
        const title = `${year} Movies`;
        navigate(`/discover`, { state: { title, apiUrl } });
    };

    const years = Array.from({ length: 2024 - 2018 + 1 }, (_, index) => 2018 + index).reverse();

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">
                            <img src={applogo} alt="appLogo" />
                            <span className="appName">Movie App</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="home-button">
                            <FaHome className="home-icon" />
                        </Link>
                    </li>
                    <li>
                        <span className='discoverBtn' onClick={() => handleYearClick("Discover", "http://localhost:8080/api/movie/get-all-movies")}>
                            Discover
                        </span>
                    </li>
                    <li><Link to="/movies"><p>Movies</p></Link></li>

                    <li onClick={toggleYearDropdown} className="by-year">
                        <p>
                            By Year
                            <span className='byYearChevron'>
                                {isYearDropdownVisible ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </p>
                        {isYearDropdownVisible && (
                            <ul className="year-dropdown">
                                {years.map((year) => (
                                    <li key={year}>
                                        <span onClick={() => handleYearClick(year, "http://localhost:8080/api/movie/get-movie-by-year/"+year)} className="year-link">
                                            {year} Movies
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <span className="search-icon"><FaSearch /></span>
                    </div>

                    <button className="text-button">
                        <span className="button-text">Register</span>
                    </button>
                    <button className="rounded-button">
                        <FaSignInAlt className="icon" />
                        <span className="button-text">Login</span>
                    </button>
                </ul>
            </nav>
            <div className='divider'></div>
        </div>
    );
};
