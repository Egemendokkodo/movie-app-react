
import { TabBar } from '../../components/TabBar/TabBar';
import MovieRobotAndMovieRequest from '../../components/MovieRobotAndMovieRequest/MovieRobotAndMovieRequest';
import { MoviesByCategory } from '../../components/MoviesByCategory/MoviesByCategory';
import { Footer } from '../../components/Footer/Footer';
export const WatchedMovies = () => {






    return (
      <div >
       <div className='pageContent'>
        Watched Movies Here
        <div className='endColumn'>
          <MovieRobotAndMovieRequest></MovieRobotAndMovieRequest>
          <MoviesByCategory></MoviesByCategory>
        </div>
      </div>
      <Footer></Footer>
      </div>
    );
  };
  