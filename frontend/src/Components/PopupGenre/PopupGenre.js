import React, { Component } from "react";
import "./PopupGenre.css";
import { GetGenreList } from "../../Services";

class PopupGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedGenres: props.genres || [],
      allGenres: [],
    };
  }

  componentDidMount = () => {
    GetGenreList()
      .then((response) => {
        if (response && response.data && response.data.genreList) {
          this.setState({ allGenres: response.data.genreList });
        }
      })
      .catch((error) => {
        this.setState({ allGenres: [] });
      });
  };

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
    const { onClose, onSelection } = this.props;

    if (selectedGenres.length >= 5) {
      onSelection(selectedGenres);
      onClose();
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
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Select Genres</h2>
          <div class="checkbox">
            {allGenres.map((genre) => (
              <label for={genre} class="checkbox-container" key={genre} style={{paddingRight:"10px"}}>
                &nbsp;{genre}
                <input
                  id={genre}
                  type="checkbox"
                  value={genre}
                  style={{margin: "25px"}}
                  checked={selectedGenres.includes(genre)}
                  onChange={() => this.handleGenreChange(genre)}
                />
                <span className="checkmark"></span> 
              </label>
            ))}
          </div>
          <div>
            {!allGenres ||
              (allGenres.length === 0 && (
                <p style={{ color: "white" }}>Loading ...</p>
              ))}
          </div>
          <div className="button-group">
            <button
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              onClick={this.handleSave}
            >
              Save
            </button>
            <button
              style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default PopupGenre;
