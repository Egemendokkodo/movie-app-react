import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/Home';
import { DiscoverPage } from './pages/Discover/Discover';
import { MoviePage } from './pages/MoviePage/MoviePage';
import { MovieDetails } from './pages/MovieDetails/MovieDetails';
import { AuthProvider } from './AuthContext/AuthContext'


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <div className="AppBody">
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/discover' element={<DiscoverPage />} />
            <Route path='/movies' element={<MoviePage />} />
            <Route path="/movies/:movieName" element={<MovieDetails />} />
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
