import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MenuHeader = () => {
  let navigate = useNavigate();
  const links = [
    { to: "/", label: "Dashboard", onClick: () => handleClick("Dashboard") },
    {
      to: "/edit-profile",
      label: "Edit Profile",
      onClick: () => handleClick("Edit Profile"),
    },
    {
      to: "/edit-preferences",
      label: "Edit Preferences",
      onClick: () => handleClick("Edit Preferences"),
    },
    {
      to: "/rate-games",
      label: "Rate Games",
      onClick: () => handleClick("Rate Games"),
    },
    {
      label: "Sign Out",
      onClick: () => handleClick("Sign Out"),
    },
  ];

  const handleClick = (label) => {
    switch (label) {
      case "Sign Out":
        sessionStorage.clear();
        localStorage.clear();
        navigate("/login");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Edit Profile":
        navigate("/edit-profile");
        break;
      case "Edit Preferences":
        navigate("/edit-preferences");
        break;
      case "Rate Games":
        navigate("/rate-games");
        break;
      default:
        navigate("/dashboard");
        break;
    }
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Game Night Recommender
        </Typography>
        {links.map((link, index) => (
          <Button
            key={index}
            size="small"
            sx={{ color: "inherit", marginLeft: "1rem" }}
            onClick={link.onClick}
          >
            {link.label}
          </Button>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default MenuHeader;
