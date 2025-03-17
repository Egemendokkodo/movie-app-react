import React, { useState, useEffect } from 'react';

import './Home.css';

import { TabBar } from '../../components/TabBar/TabBar';
import MovieRobotAndMovieRequest from '../../components/MovieRobotAndMovieRequest/MovieRobotAndMovieRequest';
import { MoviesByCategory } from '../../components/MoviesByCategory/MoviesByCategory';
import { Footer } from '../../components/Footer/Footer';
import HomepageSlider from '../../components/HomePageSlider/HomePageSlider';
export const HomePage = () => {






  return (
    <div >
    <HomepageSlider showChevrons={true} maxLength={6} />
      <div className='pageContent'>
        <TabBar></TabBar>
        <div className='endColumn'>
          <MovieRobotAndMovieRequest></MovieRobotAndMovieRequest>
          <MoviesByCategory></MoviesByCategory>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
