import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GAME from "../../Assets/game.svg";

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
      label: "Sign Out",
      onClick: () => handleClick("Sign Out"),
    },
  ];

  const handleClick = (label) => {
    switch (label) {
      case "Sign Out":
        sessionStorage.clear();
        localStorage.clear();
        navigate("/home");
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
      default:
        navigate("/dashboard");
        break;
    }
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Black color with 50% transparency
        boxShadow:
          "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
          padding: 1
      }}
    >
      <Toolbar variant="dense">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <div style={{ marginRight: 20 }}>
              <img src={GAME} width={30} height={30} />
            </div>
            <div>
              <Typography
                variant="h6"
                component="h1"
                sx={{
                  flexGrow: 1,
                  cursor: "pointer",
                  ":hover": {
                    color: "#8e6ceb",
                  },
                }}
                onClick={() => navigate("/dashboard")}
              >
                Game Night Recommender
              </Typography>
            </div>
          </div>

          <div>
            {links.map((link, index) => (
              <Button
                key={index}
                size="small"
                className="toolbar-links"
                sx={{
                  color: "inherit",
                  marginLeft: "1rem",
                  boxShadow:
                    "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
                  ":hover": {
                    color: "#8e6ceb",
                  },
                }}
                onClick={link.onClick}
              >
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MenuHeader;
