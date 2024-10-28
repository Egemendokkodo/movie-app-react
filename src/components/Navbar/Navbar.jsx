import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import applogo from '../../images/app-logo.png';
import { FaSignInAlt, FaSearch, FaHome, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa';
import axios from 'axios';
export const Navbar = () => {
    const [isYearDropdownVisible, setIsYearDropdownVisible] = useState(false);
    const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
    const [isSignUpModalVisible, setisSignUpModalVisible] = useState(false);
    const [email, setEmail] = useState(''); // E-posta state'iset
    const [nameAndSurname, setNameAndSurname] = useState(''); // E-posta state'i
    const [password, setPassword] = useState(''); // Şifre state'i
    const [passwordRepeatChange, setPasswordRepeatChange] = useState(''); 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
    const clearAllTextInputs =()=>{
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
    const handleLogin = async () => {
        setLoading(true);
    
        if (!email || !password) {
            alert("Please enter all the required fields.");
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/login`, {
                email,
                password
            });
            alert("Login successful");
            closeModal();
        } catch (error) {
            console.log(error);
            alert((error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };
    
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
    
        // Şifrelerin eşleşip eşleşmediğini kontrol et
        if (password !== passwordRepeatChange) {
            alert("Passwords doasdasd not match.");
            setLoading(false);
            return;
        }
    
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/register`, {
                email: email,
                password: password,
                rePassword: passwordRepeatChange, // Bu alanı eklemeyi unutma
                name: nameAndSurname,
                surname: nameAndSurname
            });
            alert("Signed up successfully");
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

                    <button className="text-button">
                        <span className="button-text"  onClick={closeLoginModalAndOpenSignInModal}>Register</span>
                    </button>
                    <button className="rounded-button" onClick={handleLoginClick}>
                        <FaSignInAlt className="icon" />
                        <span className="button-text">Login</span>
                    </button>
                </ul>
            </nav>
            <div className='divider'></div>

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
                                value={email} // State ile bağla
                                onChange={handleEmailChange} // Değeri güncelle
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="modal-input"
                                value={password} // State ile bağla
                                onChange={handlePasswordChange} // Değeri güncelle
                            />
                        </div>
                        <div className='textInputContainer'>
                            <button className="modal-button" onClick={handleLogin}>Login</button> {/* Giriş işlemi için buton */}
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
            {isSignUpModalVisible && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
                        <div className='titleContentNavbarLogin'>
                            <h2 className='loginPageTitle'>Sign up</h2>
                            <FaTimes className="iconClose" onClick={closeModal} />
                        </div>

                        <div className="dividerLoginPage"></div>
                        <div className='textInputContainer'>
                            <p>User Name</p>
                            <input
                                type="text"
                                placeholder="Your name"
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
                                value={email} // State ile bağla
                                onChange={handleEmailChange} // Değeri güncelle
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password</p>
                            <input
                                type="password"
                                placeholder="Password"
                                className="modal-input"
                                value={password} // State ile bağla
                                onChange={handlePasswordChange} // Değeri güncelle
                            />
                        </div>
                        <div className='textInputContainer'>
                            <p>Password(Repeat)</p>
                            <input
                                type="password"
                                placeholder="Password-Repeat"
                                className="modal-input"
                                value={passwordRepeatChange} // State ile bağla
                                onChange={handlePasswordRepeatChange} // Değeri güncelle
                            />
                        </div>
                        <div className='textInputContainer'>
                            <button className="modal-button" onClick={handleSignUp}>Sign Up</button> 
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
