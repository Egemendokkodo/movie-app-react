import React, { useState, useEffect } from 'react';
import { FaFilter, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './MoviesByCategory.css';

export const MoviesByCategory = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false); // Menüyü genişletip daraltmak için state

  useEffect(() => {
    fetch('http://localhost:8080/api/tag/get-all-tags')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setTags(data.response);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  
  const visibleTags = expanded ? tags : tags.slice(0, 14);

  return (
    <div>
      <div className='titleCategory'>
        <FaFilter color='#52525B' />
        <p className='titleText'>Movies By Category</p>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className='tagsGrid'>
          {visibleTags.map((tag) => (
            <button key={tag.tagId} className='tagButton'>
              {tag.name}
            </button>
          ))}
        </div>
      

        <div className='expandContainer'>
          <div className='expandToggle' onClick={() => setExpanded(!expanded)}>
            {expanded ? <FaChevronUp color='#fff' /> : <FaChevronDown color='#fff' />}
          </div>
        </div>
      </>
      
      )}
    </div>
  );
};
