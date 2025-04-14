import React from 'react'
import '../MoviePage/MoviePage.css'
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { MoviePageDropdown } from '../../components/Dropdown/MoviePageDropdown';



export const MoviePage = () => {
  return (
    <div className='moviePagePadding'>
      <p className='pageTitle'>Movie Robot</p>
      <div className='sizedBoxHeight'></div>

      <div className='dropdownRows'>
        <MoviePageDropdown
          icon={FaSearch}
          title="Content"
          selectedText="Movie"
        />
        <MoviePageDropdown
          icon={FaSearch}
          title="Content"
          selectedText="Movie"
        />
        <MoviePageDropdown
          icon={FaSearch}
          title="Content"
          selectedText="Movie"
        />
      </div>



    </div>
  )
}
