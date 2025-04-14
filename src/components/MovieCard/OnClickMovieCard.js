class OnClickMovieCard {
    constructor(movieId, navigate,movieName) {
      this.movieId = movieId;
      this.navigate = navigate; 
      this.movieName=movieName;
    }
  
    goToMovieDetails() {
      this.navigate(`/movies/${this.movieId}/${this.movieName}`);

      }
  }
  
  export default OnClickMovieCard;
  