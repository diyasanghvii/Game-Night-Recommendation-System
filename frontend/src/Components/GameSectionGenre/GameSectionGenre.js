import React, { useState } from 'react';
import './GameSectionGenre.css';
import Btn from '../Button/Btn';

function GameSectionGenre({ title, games, onEditGenre }) {
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
      <div className="sectionHeader">
        <h2>{title}</h2>
        <Btn label={"Edit Genre"} onClick={onEditGenre} />
      </div>
      <div className="gameCarousel">
        <Btn fullWidth={true} label={"Prev"} onClick={handlePrev} disabled={startIndex === 0}/>
        <div className="gameList">
          
        </div>
        <Btn fullWidth={true} label={"Next"} onClick={handleNext} disabled={endIndex === games.length}/>
      </div>
    </section>
  );
}

export default GameSectionGenre;
