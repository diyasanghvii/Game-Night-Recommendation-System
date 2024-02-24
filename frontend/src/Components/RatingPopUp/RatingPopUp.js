import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; 
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import FavoriteIcon from '@mui/icons-material/Favorite';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import { alignProperty } from '@mui/material/styles/cssUtils';
import './RatingPopUp.css'
import Btn from '../Button/Btn';

const RatingPopUp = ({ gameId, gameRawgId, gameName, onClose, isOwned }) => {
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGameFromRawg = async () => {
      setIsLoading(true);
      console.log(process.env.REACT_APP_RAWG_API_KEY);
      const rawg_api_key = process.env.REACT_APP_RAWG_API_KEY;

      try {
        const response = await axios.get(`https://api.rawg.io/api/games?key=${rawg_api_key}&search=${gameName}`); 
        console.log(response.data['results'][0]);
        setGameData(response.data['results'][0]);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game data', error);
      } finally {
        
      }
    };
    const fetchGameDataFromRawg = async () => {
      setIsLoading(true);
      console.log(process.env.REACT_APP_RAWG_API_KEY);
      const rawg_api_key = process.env.REACT_APP_RAWG_API_KEY;

      try {
        const response = await axios.get(`https://api.rawg.io/api/games/${gameRawgId}?key=${rawg_api_key}`); 
        setGameData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching game data', error);
      } finally {
        //setIsLoading(false);
      }
    };

    // If rawg id is given
    if (gameRawgId) {
      console.log('gameRawgId');
      fetchGameDataFromRawg(); 
    }
    else if (gameId) {
      console.log('gameId');
      fetchGameFromRawg();
    }
  }, [gameId, gameRawgId, gameName, onClose, isOwned ]);

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth> 
      <DialogTitle> 
        <strong>{gameData?.name}</strong> 
        <IconButton onClick={onClose} style={{float:"right"}}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isLoading ? (
          <p>Loading game details...</p> 
        ) : ( 
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <img src={gameData?.['background_image']} alt={gameData?.name} style={{ maxWidth: '100%' }}/>
            </Grid>

            <Grid item xs={12}>
              { gameData && gameData.description ? (
              <Typography variant="body1">
                <strong>Description:</strong> {gameData.description}
              </Typography>):(
                <p></p>
              )}
              <Typography variant="body1">
                <strong>Genres:</strong> 
                    {gameData?.genres.map(genre => (
                        <span key={genre.id} className="tag" style={{ marginRight: '5px' }}> 
                            {genre.name}
                        </span> 
                     ))} 
              </Typography>
              <hr/>
              <Typography variant="body1">
                <strong>Tags:</strong> 
                    {gameData?.tags
                       .filter(tag => tag.language === "eng") 
                       .map(tag => (
                           <span key={tag.id} className="tag" style={{ marginRight: '5px' }}> 
                               {tag.name}
                           </span> 
                        ))
                    } 
              </Typography>
              <hr/>
              
              {isOwned ? (
                <Typography variant="body1">
                  <strong>Rate it:</strong> <Rating name="game-rating"/>
                </Typography>
              ) : (
                <Typography variant="body1">
                  <strong>Interested?</strong>
                </Typography>
              )}
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RatingPopUp;
