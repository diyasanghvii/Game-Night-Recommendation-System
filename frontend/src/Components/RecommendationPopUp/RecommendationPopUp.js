import React, { useState } from "react";
// ... other imports 

const RecommendationPopup = ({ recommendations, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <strong>Your Recommendations</strong>
        <IconButton onClick={onClose} style={{ float: "right" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {recommendations.map((recommendation) => (
          <div key={recommendation.gameSteamId}>  
            <Typography variant="body1">
              <strong>{recommendation.name}</strong> 
            </Typography> 
            <Typography variant="body1">
              <strong>Reason for Recommendation:</strong> {recommendation.reason}
            </Typography>
            {/* ... Add more details here as needed */}
            <hr /> {/* Optional divider between recommendations */}
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default RecommendationPopup;
