import React, { useState } from 'react';
import './GameSectionFilter.css';
import Btn from '../Button/Btn';

function GameSectionFilter({ title, games }) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5); 

  const handleNext = () => {
    setStartIndex((prev) => Math.min(prev + 5, games.length - 5));
    setEndIndex((prev) => Math.min(prev + 5, games.length)); 
  };

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - 5, 0));
    setEndIndex((prev) => Math.max(prev - 5, 5)); 
  };

  const visibleGames = games.slice(startIndex, endIndex); 

  return (
    <section className="gameSection"> 
      <h2>{title}</h2>  
      <div className="gameCarousel">
        <Btn fullWidth={true} label={"Prev"} onClick={handlePrev} disabled={startIndex === 0}/>
        <div className="gameList">
          
        </div>
        <Btn fullWidth={true} label={"Next"} onClick={handleNext} disabled={endIndex === games.length}/>
      </div>
    </section>
  );
}


export default GameSectionFilter;
