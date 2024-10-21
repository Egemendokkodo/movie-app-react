import React, { useState } from 'react';
import './TabBar.css';
import MovieCard from '../../components/MovieCard/MovieCard';

export const TabBar = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        'Latest',
        "Editor's Choice",
        'Imdb 7+ Movies',
        'Most Commented',
        'Most Liked'
    ];

    const content = [
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Ters yüz 2", year: 2024, imdbRate: 7.2, commentCount: 0, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 2", year: 2023, imdbRate: 8.0, commentCount: 10, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 3", year: 2022, imdbRate: 6.5, commentCount: 5, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 4", year: 2021, imdbRate: 9.0, commentCount: 20, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 5", year: 2020, imdbRate: 7.5, commentCount: 8, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 6", year: 2019, imdbRate: 8.5, commentCount: 12, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 7", year: 2018, imdbRate: 7.9, commentCount: 4, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 8", year: 2017, imdbRate: 6.8, commentCount: 2, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 9", year: 2020, imdbRate: 7.5, commentCount: 8, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 10", year: 2019, imdbRate: 8.5, commentCount: 12, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 11", year: 2018, imdbRate: 7.9, commentCount: 4, watchOptions: ["Türkçe Dublaj"] },
        { image: "https://www.hdfilmcehennemi.sh/uploads/poster/inside-out-2_list.jpg", name: "Film 12", year: 2017, imdbRate: 6.8, commentCount: 2, watchOptions: ["Türkçe Dublaj"] },


    ];

    return (
        <div className='container'>
            <div className='tab_box'>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`tab_btn ${activeTab === index ? 'active' : ''}`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab}
                    </button>
                ))}
            </div>


            <div className='content_box'>
                {content.map((movie, index) => (
                    <div className='content'>
                        <MovieCard
                        key={index}
                        commentCount={movie.commentCount}
                        image={movie.image}
                        imdbRate={movie.imdbRate}
                        name={movie.name}
                        year={movie.year}
                        watchOptions={movie.watchOptions}
                        borderRadius={15}
                    />
                    </div>
                ))}
            </div>
        </div>
    );
}
