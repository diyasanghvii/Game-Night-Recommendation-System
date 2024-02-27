import React, { Component } from "react";
import "./PopupGenre.css";

class PopupGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenres: props.genres || [],
      allGenres: [
        "Action",
        "Indie",
        "Adventure",
        "RPG",
        "Strategy",
        "Shooter",
        "Casual",
        "Simulation",
        "Puzzle"
      ]
    };
  }

  handleGenreChange = (genre) => {
    const { selectedGenres } = this.state;
    const selectedIndex = selectedGenres.indexOf(genre);
    let newSelectedGenres = [...selectedGenres];

    if (selectedIndex === -1) {
      newSelectedGenres.push(genre);
    } else {
      newSelectedGenres.splice(selectedIndex, 1);
    }

    this.setState({ selectedGenres: newSelectedGenres });
  };

  handleSave = () => {
    const { selectedGenres } = this.state;
    if (selectedGenres.length >= 5) {
      this.props.onSelection(selectedGenres);
    } else {
      alert("Please select at least 5 genres...");
    }
  };

  render() {
    const { selectedGenres, allGenres } = this.state;
    const { onClose } = this.props;
    return (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Select Genres</h2>
          <div>
            {allGenres.map((genre) => (
              <label key={genre}>
                <input
                  type="checkbox"
                  value={genre}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => this.handleGenreChange(genre)}
                />{" "}
                {genre}
              </label>
            ))}
          </div>
          <div className="button-group">
            <button onClick={this.handleSave}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
  
  
  
}

export default PopupGenre;
