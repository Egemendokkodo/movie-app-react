class OnClickMovieCard {
    constructor(movieId, navigate,movieName) {
      this.movieId = movieId;
      this.navigate = navigate; 
      this.movieName=movieName;
    }
  
    goToMovieDetails() {
        this.navigate(`/movies/${this.movieName}`, { 
          state: { movieId: this.movieId } 
        }); 
      }
  }
  
  export default OnClickMovieCard;
  