import React from "react";
import "./GameSectionGenre.css";
import Btn from "../Button/Btn";

function GameSectionGenre({ title, onEditGenre, genres }) {
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
