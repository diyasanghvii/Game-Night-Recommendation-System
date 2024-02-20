import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'; // Assuming you're using react-router-dom

// Customize this with your app name and links
const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/edit-profile', label: 'Edit Profile' },
  { to: '/edit-preferences', label: 'Edit Preferences' },
  { to: '/rate-games', label: 'Rate Games' },
  { to: '/sign-out', label: 'Sign Out' },
];

function MenuHeader() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Game Night Recommender
        </Typography>
        {links.map((link) => (
          <Button key={link.to} to={link.to} size="small" component={RouterLink} sx={{ color: 'inherit', marginLeft: '1rem' }}>
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
}

export default MenuHeader;
