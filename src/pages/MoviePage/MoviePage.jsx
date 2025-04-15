import React, { useState, useEffect } from 'react'
import '../MoviePage/MoviePage.css'
import { FaChevronDown, FaChevronUp, FaSearch, FaFilter, FaCalendar, FaStar, FaSort } from 'react-icons/fa';
import { MoviePageDropdown } from '../../components/Dropdown/MoviePageDropdown';
import MovieCard from '../../components/MovieCard/MovieCard';
import axios from 'axios';

export const MoviePage = () => {
  // Tag'ler için API'den çekilecek veri
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [movieLoading, setMovieLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [size] = useState(20);
  const [hasMore, setHasMore] = useState(true);

  // API'ye gönderilecek veri
  const [filterData, setFilterData] = useState({
    watchType: "MOVIE", 
    tagIds: null,     // Başlangıçta null olacak (All seçili)
    yearOfMovie: null, // Başlangıçta null olacak (All seçili)
    imdbScore: null,   // Başlangıçta null olacak (All seçili)
    searchFilter: "2"  // Varsayılan değer olarak "2" kullanıldı
  });

  // Dropdown seçimleri için state'ler
  const [selectedContent, setSelectedContent] = useState("Movie");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedImdb, setSelectedImdb] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState("IMDb (Descending)");

  // IMDB skorları için map
  const imdbScoreMap = {
    "9 and above": 9,
    "8 and above": 8,
    "7 and above": 7,
    "6 and above": 6,
    "5 and below": 5,
    "All": null
  };

  // Filter order için map
  const orderFilterMap = {
    "IMDb (Descending)": "1",
    "IMDb (Ascending)": "2",
    "By Year (Descending)": "3",
    "By Year (Ascending)": "4",
    "Website Rating (Descending)": "5",
    "Website Rating (Ascending)": "6",
    "Total Watched": "7"
  };

  // Tag verilerini API'den çek
  useEffect(() => {
    const fetchTags = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/tag/get-all-tags');
        if (response.data.success) {
          setTags(response.data.response);
        }
      } catch (error) {
        console.error('Tag verileri çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Seçimler değiştiğinde API verisini güncelle ve filmleri çek
  useEffect(() => {
    // İçerik türü (watchType) 
    let newWatchType = selectedContent === "Movie" ? "MOVIE" : "SERIES";
    
    // Tag ID'leri (en fazla 3 tane ve seçilmemişse null)
    let newTagIds = selectedTags.length > 0 ? selectedTags.map(tag => tag.tagId) : null;
    
    // Yıl (All seçiliyse null)
    let newYear = selectedYear === "All" ? null : parseInt(selectedYear);
    
    // IMDB skoru (All seçiliyse null)
    let newImdbScore = imdbScoreMap[selectedImdb];
    
    // Sıralama filtresi
    let newSearchFilter = orderFilterMap[selectedOrder];
    
    // API verisini güncelle
    const newFilterData = {
      watchType: newWatchType,
      tagIds: newTagIds,
      yearOfMovie: newYear,
      imdbScore: newImdbScore,
      searchFilter: newSearchFilter
    };
    
    setFilterData(newFilterData);
    
    // Filtreler değiştiğinde sayfa numarasını sıfırla ve filmleri baştan çek
    setPage(0);
    setMovies([]);
    setHasMore(true);
    
    fetchMovies(0, size, newFilterData);
    
  }, [selectedContent, selectedTags, selectedYear, selectedImdb, selectedOrder]);

  // Filmleri API'den çek
  const fetchMovies = async (pageNum, pageSize, filters) => {
    try {
      setMovieLoading(true);
      
      const params = new URLSearchParams({
        page: pageNum,
        size: pageSize
      });
      
      const response = await axios.post(
        `http://localhost:8080/api/movie/detailed-search?${params.toString()}`, 
        filters
      );
      
      if (response.data.success) {
        if (pageNum === 0) {
          // İlk sayfa ise filmleri yeniden ata
          setMovies(response.data.response.movies);
        } else {
          // Sonraki sayfalar ise mevcut filmlere ekle
          setMovies(prevMovies => [...prevMovies, ...response.data.response.movies]);
        }
        
        // Eğer gelen film sayısı pageSize'dan azsa daha fazla sayfa yoktur
        if (response.data.response.movies.length < pageSize) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Filmler çekilirken hata oluştu:', error);
    } finally {
      setMovieLoading(false);
    }
  };

  // Daha fazla film yükle
  const loadMoreMovies = () => {
    if (!movieLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMovies(nextPage, size, filterData);
    }
  };

  // Her bir dropdown için handler fonksiyonları
  const handleContentChange = (value) => {
    setSelectedContent(value);
  };

  const handleTagChange = (selectedTagObjects) => {
    if (selectedTagObjects === "All") {
      setSelectedTags([]);
    } else {
      setSelectedTags(selectedTagObjects);
    }
  };

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleImdbChange = (value) => {
    setSelectedImdb(value);
  };

  const handleOrderChange = (value) => {
    setSelectedOrder(value);
  };

  // Scroll event handler - sayfa sonuna gelindiğinde daha fazla film yükle
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 300 && 
        !movieLoading && 
        hasMore
      ) {
        loadMoreMovies();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [movieLoading, hasMore]);

  return (
    <div className='moviePagePadding'>
      <p className='pageTitle'>Movie Robot</p>
      <div className='sizedBoxHeight'></div>

      <div className='dropdownRows'>
        <MoviePageDropdown
          icon={FaSearch}
          title="Content"
          selectedText={selectedContent}
          options={["Movie", "Series"]}
          onSelect={handleContentChange}
        />
        <MoviePageDropdown
          icon={FaFilter}
          title="Tags"
          selectedText={selectedTags.length === 0 ? "All" : 
                        selectedTags.length === 1 ? selectedTags[0].name :
                        `${selectedTags.length} tags selected`}
          options={[{ tagId: -1, name: "All" }, ...tags]}
          onSelect={handleTagChange}
          isMultiSelect={true}
          maxSelect={3}
          isLoading={loading}
          isTagDropdown={true}
        />
        <MoviePageDropdown
          icon={FaCalendar}
          title="Year"
          selectedText={selectedYear}
          options={["All", "2024", "2023", "2022", "2021", "2020", "2019", "2018"]}
          onSelect={handleYearChange}
        />
        <MoviePageDropdown
          icon={FaStar}
          title="IMDb Rate"
          selectedText={selectedImdb}
          options={["All", "9 and above", "8 and above", "7 and above", "6 and above", "5 and below"]}
          onSelect={handleImdbChange}
        />
        <MoviePageDropdown
          icon={FaSort}
          title="Order"
          selectedText={selectedOrder}
          options={["IMDb (Descending)", "IMDb (Ascending)", "By Year (Descending)", "By Year (Ascending)", "Website Rating (Descending)", "Website Rating (Ascending)", "Total Watched"]}
          onSelect={handleOrderChange}
        />
      </div>
      <div className='sizedBoxHeight'></div>
      {/* Filmler Listesi */}
      <div className='content_box_movie_robot_page'>
            {movies.map((movie, index) => (
              <div className='content' key={index}>
                <MovieCard
                  commentCount={movie.movieTotalCommentCount}
                  image={movie.movieImage}
                  imdbRate={movie.movieImdbRate}
                  name={movie.name}
                  year={movie.movieReleaseYear}
                  watchOptions={movie.watchOptions}
                  borderRadius={15}
                  tags={movie.tags}
                  details={movie.movieDetails}
                  movieId={movie.movieId}
                />
              </div>
            ))}
          </div>

      {/* Yükleniyor göstergesi */}
      {movieLoading && (
        <div className="loadingContainer">
          <div className="loader"></div>
          <p>Filmler yükleniyor...</p>
        </div>
      )}

      {/* Daha fazla film yükle butonu */}
      {!movieLoading && hasMore && movies.length > 0 && (
        <div className="loadMoreContainer">
          <button className="loadMoreButton" onClick={loadMoreMovies}>
            Daha Fazla Film Yükle
          </button>
        </div>
      )}
    </div>
  )
}