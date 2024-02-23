import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; 
import CloseIcon from '@mui/icons/Close';
import Rating from '@mui/material/Rating'; 
import ThumbUpIcon from '@mui/icons/ThumbUp';
import FavoriteIcon from '@mui/icons/Favorite';
import ThumbDownIcon from '@mui/icons/ThumbDown';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';

const RatingPopUp = ({ gameId, onClose, isOwned }) => {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGameData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameId}?key={{RAWG_API_KEY}}`); 
        setGameData(response.data);
      } catch (error) {
        console.error('Error fetching game data', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (gameId) { // Only fetch if a gameId is provided
      fetchGameData(); 
    }
  }, [gameId]);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth> 
      <DialogTitle> 
        {gameData?.name} 
        <IconButton onClick={onClose} /* ... IconButton props */>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isLoading ? (
          <p>Loading game details...</p> 
        ) : ( 
          <Grid container spacing={2}>
            {/* ... Grid Items for Image, Description, Tags, Genres */}

            <Grid item xs={12}>
              {isOwned ? (
                <Rating name="game-rating" /* ... */ />
              ) : (
                <div className="interest-buttons">
                  {/* ... buttons with ThumbUpIcon, FavoriteIcon, ThumbDownIcon */}
                </div>
              )}
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RatingPopUp;
