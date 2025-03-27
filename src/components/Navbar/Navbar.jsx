import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import applogo from '../../images/app-logo.png';
import { FaSignInAlt, FaSearch, FaHome, FaChevronDown, FaChevronUp, FaTimes, FaArrowRight, FaSignOutAlt, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthContext';

export const Navbar = () => {
    const { user, isLoggedIn, login, logout } = useAuth(); // AuthContext'ten değerleri alın
    const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignUpModalVisible, setisSignUpModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [nameAndSurname, setNameAndSurname] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeatChange, setPasswordRepeatChange] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Mevcut fonksiyonlar aynı kalır
    const toggleYearDropdown = () => {
        setIsYearDropdownVisible(!isYearDropdownVisible);
    };

    const handleYearClick = (year, apiUrl) => {
        const title = `${year} Movies`;
        navigate(`/discover`, { state: { title, apiUrl } });
    };

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
            
            // Başarılı giriş durumunda kullanıcı verilerini kaydet
            if (response.data.success) {
                login(response.data.response); // AuthContext'in login fonksiyonunu kullan
                alert("Giriş başarılı");
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
            alert("Signed up successfully "+JSON.stringify(response));
            closeModal();
        } catch (error) {
            console.log(error);
            alert((error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
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
                            <ul className="year-dropdown">
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

                    <div className="search-container">
                        <input type="text" placeholder="Search..." className="search-input" />
                        <span className="search-icon"><FaSearch /></span>
                    </div>

                    {isLoggedIn ? (
                        // Kullanıcı giriş yapmışsa
                        <>
                            <div className="user-info">
                                <FaUser className="icon" />
                                <span className="username">{user.username || user.email}</span>
                            </div>
                            <button className="rounded-button" onClick={handleLogout}>
                                <FaSignOutAlt className="icon" />
                                <span className="button-text">Logout</span>
                            </button>
                        </>
                    ) : (
                        // Kullanıcı giriş yapmamışsa
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
                                className="modal-input"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="modal-input"
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
                                className="modal-input"
                                value={nameAndSurname} 
                                onChange={handleNameAndSurnameChange} 
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>E-mail</p>
                            <input
                                type="text"
                                placeholder="E-mail"
                                className="modal-input"
                                value={email}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="modal-input"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password(Repeat)</p>
                            <input
                                type="password"
                                placeholder="Password-Repeat"
                                className="modal-input"
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
