import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MenuHeader = () => {
  let navigate = useNavigate();
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/edit-profile", label: "Edit Profile" },
    { to: "/edit-preferences", label: "Edit Preferences" },
    { to: "/rate-games", label: "Rate Games" },
    {
      label: "Sign Out",
      onClick: () => handleClick("sign-out"),
    },
  ];

  const handleClick = (label) => {
    if (label === "sign-out") {
      sessionStorage.removeItem("authToken");
      navigate("/login");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
          Game Night Recommender
        </Typography>
        {links.map((link) => (
          <Button
            key={link.to}
            to={link.to}
            size="small"
            component={RouterLink}
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
