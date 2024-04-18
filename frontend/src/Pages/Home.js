import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Images
import IMAGE3 from "../Assets/Image3.jpg";
import IMAGE2 from "../Assets/Image2.jpg";
import IMAGE4 from "../Assets/Image4.png";
import { useNavigate } from "react-router-dom";

const Font_Color = "white";

const cardStyle = {
  width: 400,
  height: 200,
  padding: 20,
  borderRadius: 20,
  marginBottom: 20,
  shadows: "12px 12px black",
  color: Font_Color,
};

const cardContainerRoot = {
  marginTop: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  flexWrap: "wrap",
  alignItems: "center",
  alignSelf: "center",
};

const cardContainerStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-around",
  color: Font_Color,
};

const Background_color = "#010f1c";

const cardHeadingStyle = { fontSize: "2.2rem", margin: 0, color: Font_Color };
const cardSubHeader = { marginTop: 30, fontSize: "1.3rem" };

const bigCardContainer = {
  display: "flex",
  flexDirection: "row",
  // alignItems: "center",
  marginTop: 20,
  paddingLeft: 190,
  paddingRight: 190,
};

const bigCardHeader = {
  fontSize: "2.5rem",
  color: "#8224c9",
  marginBottom: 50,
};
const bigCardSubHeader = {
  fontSize: "1.8rem",
  color: Font_Color,
};

const Home = () => {
  let navigate = useNavigate();
  return (
    <div
      style={{
        background: Background_color,
        backgroundImage: "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        overflow: "scroll",
        color: "white !important",
      }}
      className="home-page-root"
    >
      {/* TOOL BAR - START */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: Background_color, color: Font_Color }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* TOOL BAR - END */}

      <div style={{ padding: 20 }}>
        {/* TOP DISPLAY START */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <div style={{ width: "100%" }}>
            <img className="image-bg" src={IMAGE4} />
          </div>
          <div
            style={{
              position: "absolute",
              padding: 20,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p style={{ fontSize: "3rem", color: Font_Color, margin: 0 }}>
              GAME NIGHT RECOMMENDER
            </p>
            <p
              style={{
                margin: 0,
                marginTop: 10,
                color: Font_Color,
                fontSize: "4.5rem",
              }}
            >
              Your One Stop steam game recommender
            </p>
            <button
              style={{
                width: 200,
                height: 50,
                backgroundColor: "greenyellow",
                border: "none",
                borderRadius: 10,
                marginTop: 10,
              }}
              onClick={() => navigate("/login")}
            >
              TRY NOW
            </button>
          </div>
        </div>
        {/* TOP DISPLAY END */}

        {/* BANNER - START */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <p style={{ fontSize: "2.5rem", color: "#8768ed" }}>SHOP AT GNR</p>
          <p style={{ fontSize: "2rem", color: "green", width: 700 }}>
            Looking for the latest releases? Or are retro classics more your
            thing? At Kyobi, we stock a wide selection of titles for every kind
            of gamer.
          </p>
          <p style={{ fontSize: "2.5rem", color: "#8768ed" }}>OUR FEATURES ↓</p>
        </div>
        {/* BANNER - END */}

        {/* CARDS CONTAINER - START */}
        <div style={cardContainerRoot}>
          {/* CARD 1 START */}
          <div style={cardStyle}>
            <div style={cardContainerStyle}>
              <div>
                <img src={IMAGE2} width={200} height={200} />
              </div>
              <div style={{ padding: 20 }}>
                <p style={cardHeadingStyle}>Feature One</p>
                <p style={cardSubHeader}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
          {/* CARD 1 END */}

          {/* CARD 2 START */}
          <div style={cardStyle}>
            <div style={cardContainerStyle}>
              <div>
                <img src={IMAGE2} width={200} height={200} />
              </div>
              <div style={{ padding: 20 }}>
                <p style={cardHeadingStyle}>Feature One</p>
                <p style={cardSubHeader}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
          {/* CARD 2 END */}

          {/* CARD 3 START */}
          <div style={cardStyle}>
            <div style={cardContainerStyle}>
              <div>
                <img src={IMAGE2} width={200} height={200} />
              </div>
              <div style={{ padding: 20 }}>
                <p style={cardHeadingStyle}>Feature One</p>
                <p style={cardSubHeader}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
            </div>
          </div>
          {/* CARD 3 END */}
        </div>
        {/* CARDS CONTAINER - END */}

        {/* ROW CARDS - START */}
        <div>
          {/* FIRST */}
          <div>
            <div style={bigCardContainer}>
              <div>
                <img src={IMAGE3} width={400} height={500} />
              </div>
              <div style={{ padding: 80 }}>
                <p style={bigCardHeader}>
                  GAME <br /> NIGHT
                  <br /> RECOMMENDER
                </p>
                <p style={bigCardSubHeader}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            </div>
          </div>
          {/* SECOND */}
          <div style={{ marginTop: 60 }}>
            <div style={bigCardContainer}>
              <div>
                <img src={IMAGE3} width={400} height={500} />
              </div>
              <div style={{ padding: 80 }}>
                <p style={bigCardHeader}>
                  GAME <br /> NIGHT
                  <br /> RECOMMENDER
                </p>
                <p style={bigCardSubHeader}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
              </div>
            </div>
          </div>
          {/* ROW CARDS - END */}
        </div>
      </div>
    </div>
  );
};

export default Home;
