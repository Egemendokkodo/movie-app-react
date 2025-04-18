import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import applogo from '../../images/app-logo.png';
import { FaSignInAlt, FaSearch, FaHome, FaChevronDown, FaChevronUp, FaTimes, FaArrowRight, FaSignOutAlt, FaUser, FaBolt, FaStar, FaCog, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthContext';
import OnClickMovieCard from '../MovieCard/OnClickMovieCard';
export const Navbar = () => {
    const { user, isLoggedIn, login, logout } = useAuth(); // AuthContext'ten değerleri alın
    const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);

    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignUpModalVisible, setisSignUpModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeatChange, setPasswordRepeatChange] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();



    const dropdownRef = useRef(null);
    const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownVisible(prev => !prev);
    };

    const profileDropdownRef = useRef(null);
    const yearDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setIsProfileDropdownVisible(false);
            }

            if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
                setIsYearDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const toggleYearDropdown = () => {
        setIsYearDropdownVisible(!isYearDropdownVisible);

    };

    const handleYearClick = (year, apiUrl) => {
        console.log("TIKLANDI YEAR")
        const title = `${year} Movies`;
        navigate(`/discover`, { state: { title, apiUrl } });
    };
    const handleWatchedMoviesClick =()=>{
        navigate(`/watched-movies`,);
    }

    const handleLoginClick = () => {
        setIsLoginModalVisible(true);
    };

    const clearAllTextInputs = () => {
        setEmail('');
        setPassword('');
        setNameAndSurname('');
        setPasswordRepeatChange('');
    }

    const closeModal = () => {
        setIsLoginModalVisible(false);
        setisSignUpModalVisible(false);
        clearAllTextInputs();
    };

    const closeLoginModalAndOpenSignInModal = () => {
        setIsLoginModalVisible(false);
        setisSignUpModalVisible(true);
        clearAllTextInputs();
    };

    const closeSignInModalAndOpenLoginModal = () => {
        setIsLoginModalVisible(true);
        setisSignUpModalVisible(false);
        clearAllTextInputs();
    };

    const years = Array.from({ length: 2024 - 2018 + 1 }, (_, index) => 2018 + index).reverse();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleNameAndSurnameChange = (e) => {
        setNameAndSurname(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handlePasswordRepeatChange = (e) => {
        setPasswordRepeatChange(e.target.value);
    };
    const handleSearchInputTextChange = (e) => {
        setSearchText(e.target.value);
    };
    // Login fonksiyonunu güncelle
    const handleLogin = async () => {
        setLoading(true);

        if (!email || !password) {
            alert("Lütfen tüm gerekli alanları doldurun.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/login`, {
                email,
                password
            });


            if (response.data.success) {
                login(response.data.response);
                alert("Login Successful");
                closeModal();
            }
        } catch (error) {
            console.log(error);
            alert((error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    // Logout fonksiyonu ekle
    const handleLogout = () => {
        logout(); // AuthContext'in logout fonksiyonunu kullan
        navigate('/'); // Ana sayfaya yönlendir
    };

    // Diğer fonksiyonlar aynı kalır
    const handleSignUp = async () => {
        console.log('Email:', email);
        console.log('Password:', password);
        console.log("Re password:", passwordRepeatChange);
        console.log("User Name: ", nameAndSurname);
        setLoading(true);

        if (!email || !password || !passwordRepeatChange || !nameAndSurname) {
            alert("Please enter all the required fields.");
            setLoading(false);
            return;
        }

        if (password !== passwordRepeatChange) {
            alert("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/api/auth/register`, {
                email: email,
                password: password,
                rePassword: passwordRepeatChange,
                name: "name",
                surname: "surname",
                userName: nameAndSurname
            });
            alert("Signed up successfully " + JSON.stringify(response));
            closeModal();
        } catch (error) {
            console.log(error);
            alert((error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const [showPopup, setShowPopup] = useState(false);

    const handleSearchClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                handleClosePopup();
            }
        };


        window.addEventListener("keydown", handleKeyDown);


        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchText.trim() !== '') {
                axios.get("http://localhost:8080/api/movie/search?query=" + searchText)
                    .then((response) => {
                        setSearchResults(response.data.response.movies); // ✅ Bu doğru!
                    })

                    .catch((error) => {
                        console.error("Search error: ", error);
                        setSearchResults([]);
                    });
            } else {
                setSearchResults([]);
            }
        }, 400); // 400ms debounce

        return () => clearTimeout(delayDebounceFn); // debounce temizlik
    }, [searchText]);

    const handleSearchItemClick = (movieId, name) => {
        handleClosePopup();
        const movieCard = new OnClickMovieCard(movieId, navigate, name);
        movieCard.goToMovieDetails(); // 
    };

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
                            <ul className="year-dropdown" ref={yearDropdownRef}>
                                {years.map((year) => (
                                    <li key={year}>
                                        <span onClick={() => handleYearClick(year, "http://localhost:8080/api/movie/get-movie-by-year/" + year)} className="year-link">
                                            {year} Movies
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>

                    <div className="search-container" hidden={showPopup}>
                        <input type="text" placeholder="Search..." className="search-input" onClick={handleSearchClick} />
                        <span className="search-icon"><FaSearch /></span>
                    </div>

                    {showPopup && (
                        <div className="search-popup" onClick={handleClosePopup}>
                            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
                                <div className="popup-search-wrapper">
                                    <FaSearch className="popup-search-icon" />
                                    <input
                                        type="text"
                                        className="popup-search-input"
                                        placeholder="Search movie by name"
                                        value={searchText}
                                        onChange={handleSearchInputTextChange}
                                    />
                                    <div className="escButton" onClick={handleClosePopup}><p>ESC</p></div>
                                </div>

                                {searchText && <div className="searchResultText">
                                    <FaSearch className="popup-search-icon2" size={14} />
                                    <p>Search results for: {searchText}</p>
                                </div>}

                                <div className="search-results">
                                    {searchResults.length > 0 ? (
                                        <div>
                                            {searchResults.map((movie) => (
                                                <div key={movie.id} className='searchOuter' onClick={() => handleSearchItemClick(movie.movieId, movie.name)}>
                                                    <div >
                                                        <div className='searchImageContainer'>
                                                            <img className='movieImageSearch' src={movie.movieImage} alt="Movie"></img>
                                                        </div>
                                                    </div>
                                                    <div className='sizedBoxWidthSearch'></div>
                                                    <div className='filmdetailsContainer'>
                                                        <div className='filmAttributes'>
                                                            <div className='movieDetailBoxSearch' ><p>{movie.movieReleaseYear}</p></div>
                                                            <div className='movieDetailBoxSearch' ><FaStar color='gold' ></FaStar> <p>{movie.movieDetails.websiteRating}</p></div>
                                                            <div className='movieDetailBoxSearch' ><p>Movie</p></div>
                                                        </div>
                                                        <p className='searchMovieName'>{movie.name}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    ) : (
                                        searchText && <p></p>
                                    )}
                                </div>


                            </div>
                        </div>

                    )}
                    {isLoggedIn ? (
                        <li onClick={toggleProfileDropdown} ref={profileDropdownRef} className="profileContainer">
                            <div className="user-info">
                                <FaUser className="icon" />
                                <span className="username">{user.username || user.email}</span>
                                <div className='profileChevron'>{isProfileDropdownVisible ? <FaChevronUp /> : <FaChevronDown />}</div>
                            </div>
                            {isProfileDropdownVisible && (
                                <ul className="profile-dropdown">
                                    <li >
                                        <span className="profile-link">
                                            <FaCog />
                                            <p>Profile Settings</p>
                                        </span>
                                        <span className="profile-link" onClick={handleWatchedMoviesClick}>
                                            <FaEye />
                                            <p>Watched Movies</p>
                                        </span>

                                        <span className="profile-link" onClick={handleLogout}>
                                            <FaSignOutAlt className="signOutIcon" />
                                            <p>Sign Out</p>
                                        </span>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ) : (
                        <>
                            <button className="text-button">
                                <span className="button-text" onClick={closeLoginModalAndOpenSignInModal}>Kayıt Ol</span>
                            </button>
                            <button className="rounded-button" onClick={handleLoginClick}>
                                <FaSignInAlt className="icon" />
                                <span className="button-text">Giriş</span>
                            </button>
                        </>
                    )}

                </ul>
            </nav>
            <div className='divider'></div>

            {/* Login Modal */}
            {isLoginModalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
                        <div className='titleContentNavbarLogin'>
                            <h2 className='loginPageTitle'>Login</h2>
                            <FaTimes className="iconClose" onClick={closeModal} />
                        </div>

                        <div className="dividerLoginPage"></div>

                        <div className='textInputContainer'>
                            <p>E-mail</p>
                            <input
                                type="text"
                                placeholder="E-mail"
                                className="modal-input-search"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="modal-input-search"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <button className="modal-button" onClick={handleLogin}>
                                <div className='buttonInside'>
                                    <p>Login</p><FaArrowRight></FaArrowRight>
                                </div>
                            </button>
                        </div>

                        <div className='orLoginPage'>
                            <div className="orLoginPageDivider"></div>
                            <p>or</p>
                            <div className="orLoginPageDivider"></div>
                        </div>
                        <div className='loginPageFooter'>
                            <p>Forgot my password</p>
                            <p>E-mail activation</p>
                            <p onClick={closeLoginModalAndOpenSignInModal}>Sign up</p>
                        </div>
                    </div>
                </div>
            )}

            {/* SignUp Modal */}
            {isSignUpModalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
                        <div className='titleContentNavbarLogin'>
                            <h2 className='loginPageTitle'>Sign up</h2>
                            <FaTimes className="iconClose" onClick={closeModal} />
                        </div>

                        <div className="dividerLoginPage"></div>
                        <div className='textInputContainer'>
                            <p>Username</p>
                            <input
                                type="text"
                                placeholder="Username"
                                className="modal-input-search"
                                value={nameAndSurname}
                                onChange={handleNameAndSurnameChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>E-mail</p>
                            <input
                                type="text"
                                placeholder="E-mail"
                                className="modal-input-search"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="modal-input-search"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password(Repeat)</p>
                            <input
                                type="password"
                                placeholder="Password-Repeat"
                                className="modal-input-search"
                                value={passwordRepeatChange}
                                onChange={handlePasswordRepeatChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <button className="modal-button" onClick={handleSignUp}>
                                <div className='buttonInside'>
                                    <p>Sign Up</p><FaArrowRight></FaArrowRight>
                                </div>
                            </button>
                        </div>

                        <div className='orLoginPage'>
                            <div className="orLoginPageDivider"></div>
                            <p>or</p>
                            <div className="orLoginPageDivider"></div>
                        </div>
                        <div className='loginPageFooter'>
                            <p>Forgot my password</p>
                            <p>E-mail activation</p>
                            <p onClick={closeSignInModalAndOpenLoginModal}>Login</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

{/* <button className="rounded-button" onClick={handleLogout}>
                                <FaSignOutAlt className="icon" />
                                <span className="button-text">Logout</span>
                            </button> */}