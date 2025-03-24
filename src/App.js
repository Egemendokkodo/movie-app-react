
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { HomePage } from './pages/HomePage/Home';
import { DiscoverPage } from './pages/Discover/Discover';
import { MoviePage } from './pages/MoviePage/MoviePage';
import {MovieDetails} from './pages/MovieDetails/MovieDetails';

function App() {
  return (
    <div className="App">
      <div className="AppBody">
       <Navbar/>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/discover' element={<DiscoverPage></DiscoverPage>}></Route>
          <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
          <Route path="/movies/:movieName" element={<MovieDetails />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
