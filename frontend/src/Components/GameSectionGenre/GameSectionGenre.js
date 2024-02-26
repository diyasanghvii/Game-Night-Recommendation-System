import React, { useState } from 'react';
import './GameSectionGenre.css';
import Btn from '../Button/Btn';

function GameSectionGenre({ title, games, onEditGenre, genres }) {
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
       
        <div className="gameList" style={{ textAlign: "left" }}>
          <h3>Saved Genres:</h3>
          <ul>
            {genres.map((genre, index) => (
              <li key={index}>{genre}</li>
            ))}
          </ul>
        </div>
       
      </div>
    </section>
  );
}

export default GameSectionGenre;
