import React, { Component } from "react";
import "./Popup.css";

class Popup extends Component {
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
      // Add the genre if it's not already selected
      newSelectedGenres.push(genre);
    } else {
      // Remove the genre if it's already selected
      newSelectedGenres.splice(selectedIndex, 1);
    }

    this.setState({ selectedGenres: newSelectedGenres });
  };

  handleSave = () => {
    // Pass the selected genres back to the parent component
    this.props.onSelection(this.state.selectedGenres);
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

export default Popup;
