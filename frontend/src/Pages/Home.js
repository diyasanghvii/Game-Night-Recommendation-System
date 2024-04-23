import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// Images
import IMAGE3 from "../Assets/Image3.jpg";
import GAME from "../Assets/game.svg";
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

const cardHeadingStyle = {
  fontSize: "1.8rem",
  margin: 0,
  color: Font_Color,
  textAlign: "center",
  color: "#fff",
  textShadow:
    "0 0 1px #fff,0 0 42px #5271ff, 0 0 92px #5271ff, 0 0 102px #5271ff, 0 0 151px #5271ff",
  padding: "20px 30px 0px 30px",
};
const cardSubHeader = {
  marginTop: 30,
  fontSize: "1.3rem",
  color: Font_Color,
  textAlign: "center",
  padding: "0px 30px 10px 30px",
};

const bigCardContainer = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justify: "space-between",
  marginTop: 20,
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
        //backgroundImage: "none",
        backgroundImage: `url("https://i.postimg.cc/GtVtRf94/Image4-1713574505520.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        color: "white !important",
        opacity: "1",
        overflowY: "scroll",
        backgroundRepeat: "no-repeat",
      }}
      className="home-page-root"
    >
      {/* TOOL BAR - START */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: Font_Color }}
        >
          <Toolbar>
            <div style={{ marginLeft: 30 }}>
              <img src={GAME} width={40} height={40} />
            </div>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            <Button
              sx={{
                boxShadow: "0 0 10px 2px #7c5295",
                margin: "0 10px 0 10px",
                backgroundColor: "rgba(0, 0, 0, 0.0)",
                borderStyle: "inset",
                borderWidth: "0.25px",
                borderColor: "#D69EF8",
              }}
              color="inherit"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              sx={{
                boxShadow: "0 0 10px 2px #7c5295",
                margin: "0 35px 0 10px",
                backgroundColor: "rgba(0, 0, 0, 0.0)",
                borderStyle: "inset",
                borderWidth: "0.25px",
                borderColor: "#D69EF8",
              }}
              color="inherit"
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      {/* TOOL BAR - END */}

      <div style={{ padding: "0px 50px 10px 50px" }}>
        {/* TOP DISPLAY START */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            marginTop: 30,
          }}
        >
          <div
            style={{
              padding: "10px 50px 50px 50px",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              borderRadius: "20px",
              width: "100%",
              borderStyle: "inset",
              boxShadow: "0 0 20px 2px #7c5295",
              borderColor: "#D69EF8",
            }}
          >
            <p
              style={{
                fontSize: "3rem",
                color: Font_Color,
                textShadow: "0px 0px 30px #0B6A99",
              }}
            >
              GAME NIGHT RECOMMENDER
            </p>
            <p
              style={{
                margin: 0,
                marginTop: 10,
                color: Font_Color,
                fontSize: "4.5rem",
                textShadow: "0px 0px 30px #0B6A99",
              }}
            >
              Your one stop Steam game recommender
            </p>
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
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderRadius: "20px",
            width: "100%",
            marginTop: "50px",
            borderStyle: "inset",
            boxShadow: "0 0 20px 2px #7c5295",
            borderColor: "#D69EF8",
          }}
        >
          <p
            style={{
              fontSize: "2.5rem",
              color: "white",
              textShadow: "0px 0px 30px #0B6A99",
            }}
          >
            Powered By
          </p>

          {/* BANNER - END */}

          {/* CARDS CONTAINER - START */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "0 0 50px 0",
              padding: "0 40px 0 40px",
            }}
          >
            {/* CARD 1 START */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "20px",
                width: "30%",
                minWidth: 150,
                minHeight: 340,
                borderStyle: "inset",
                boxShadow: "0 0 20px 2px #312CC7",
                borderColor: "#D69EF8",
              }}
            >
              <div style={{ padding: "20px 20px 0px 20px" }}>
                <img
                  src="https://gamalytic.com/gamalytic_logo.svg"
                  width={95}
                  height={90}
                  margin={0}
                />
              </div>
              <div style={{ padding: "0px 20px 20px 20px" }}>
                <p style={cardHeadingStyle}>Gamalytic</p>
                <p style={cardSubHeader}>
                  Get real-time Steam game statistics. Release dates, price,
                  rating scores and more !
                </p>
              </div>
            </div>
            {/* CARD 1 END */}

            {/* CARD 2 START */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "20px",
                width: "30%",
                minHeight: 340,
                minWidth: 150,
                borderStyle: "inset",
                boxShadow: "0 0 20px 2px #312CC7",
                borderColor: "#D69EF8",
              }}
            >
              <div style={{ padding: "20px 20px 0px 20px" }}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/1024px-Steam_icon_logo.svg.png"
                  width={100}
                  height={100}
                  margin={20}
                />
              </div>
              <div style={{ padding: "0px 20px 20px 20px" }}>
                <p style={cardHeadingStyle}>Steam</p>
                <p style={cardSubHeader}>
                  To retrieve your customized gaming group's latest gaming
                  activity data
                </p>
              </div>
            </div>
            {/* CARD 2 END */}

            {/* CARD 3 START */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                borderRadius: "20px",
                width: "30%",
                minHeight: 340,
                minWidth: 150,
                borderStyle: "inset",
                boxShadow: "0 0 20px 2px #312CC7",
                borderColor: "#D69EF8",
              }}
            >
              <div style={{ padding: "20px 20px 0px 20px" }}>
                <img
                  src="https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a69f118df70ad7828d4_icon_clyde_blurple_RGB.svg"
                  width={100}
                  height={100}
                  margin={20}
                />
              </div>
              <div style={{ padding: "0px 20px 20px 20px" }}>
                <p style={cardHeadingStyle}>Discord</p>
                <p style={cardSubHeader}>
                  Send your personalized group game recommendations to a channel
                  of your choice
                </p>
              </div>
            </div>
            {/* CARD 3 END */}
          </div>
          {/* CARDS CONTAINER - END */}
        </div>
        {/* ROW CARDS - START */}
        <div
          style={{
            display: "flex",
            flex: "wrap",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            borderRadius: "20px",
            width: "100%",
            marginTop: "50px",
            borderStyle: "inset",
            boxShadow: "0 0 20px 2px #7c5295",
            borderColor: "#D69EF8",
          }}
        >
          <p
            style={{
              fontSize: "2.5rem",
              color: "white",
              textShadow: "0px 0px 30px #0B6A99",
            }}
          >
            Features
          </p>
          {/* FIRST */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "20px",
              width: "80%",
              height: "auto",
              borderStyle: "inset",
              boxShadow: "0 0 20px 2px #312CC7",
              borderColor: "#D69EF8",
            }}
          >
            <div style={bigCardContainer}>
              <div style={{ padding: 40 }}>
                <img
                  src="https://i.postimg.cc/nLHtXBWS/pngegg-overlay-4-overlay.png"
                  width="auto"
                  height={500}
                />
              </div>
              <div style={{ padding: 40 }}>
                <p style={bigCardHeader}>
                  DISCOVER <br /> GAMES
                </p>
                <p style={bigCardSubHeader}>
                  Dive into Steam's vast library of games tailored to your
                  tastes. Filter by tags, genres, and features to find the
                  perfect match. Sort options allow you to arrange games by
                  price, release date, or rating, ensuring you find exactly what
                  you're looking for. With comprehensive game info, you'll make
                  informed decisions about your next gaming experience.
                </p>
              </div>
            </div>
          </div>
          {/* SECOND */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "20px",
              width: "80%",
              height: "auto",
              marginTop: "30px",
              borderStyle: "inset",
              boxShadow: "0 0 20px 2px #312CC7",
              borderColor: "#D69EF8",
            }}
          >
            <div style={bigCardContainer}>
              <div style={{ padding: 40 }}>
                <img
                  src="https://i.postimg.cc/1XN12DkL/pngegg-overlay-1-overlay.png"
                  width="auto"
                  height={500}
                />
              </div>
              <div style={{ padding: 40 }}>
                <p style={bigCardHeader}>
                  RATE GAMES AND <br /> EXPRESS YOUR INTEREST
                </p>
                <p style={bigCardSubHeader}>
                  Shape your gaming journey by rating games you own and
                  expressing interest in new titles. These ratings will later be
                  considered by the algorithm for recommending games, both for
                  you and the members you select.
                </p>
              </div>
            </div>
          </div>
          {/* THIRD */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "20px",
              width: "80%",
              height: "auto",
              marginTop: "30px",
              borderStyle: "inset",
              boxShadow: "0 0 20px 2px #312CC7",
              borderColor: "#D69EF8",
            }}
          >
            <div style={bigCardContainer}>
              <div style={{ padding: 40 }}>
                <img
                  src="https://i.postimg.cc/7LtpscB0/pngegg-overlay-2-overlay.png"
                  width="auto"
                  height={500}
                />
              </div>
              <div style={{ padding: 40 }}>
                <p style={bigCardHeader}>
                  GENERATE <br /> RECOMMENDATIONS
                </p>
                <p style={bigCardSubHeader}>
                  Customize your gaming experience like never before. Select
                  members from any Discord server, and our algorithm will
                  analyze everyone's ratings, expressed interests, playtime, and
                  preferred genres to generate personalized recommendations.
                  Plus, you have the flexibility to weight each parameter
                  according to your liking, ensuring that the recommendations
                  perfectly align with your gaming preferences.
                </p>
              </div>
            </div>
          </div>
          {/* FOURTH */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "20px",
              width: "80%",
              marginTop: "30px",
              marginBottom: "40px",
              height: "auto",
              borderStyle: "inset",
              boxShadow: "0 0 20px 2px #312CC7",
              borderColor: "#D69EF8",
            }}
          >
            <div style={bigCardContainer}>
              <div style={{ padding: 40 }}>
                <img
                  src="https://i.postimg.cc/TY4ZVJ5b/pngegg-overlay-3-overlay.png"
                  width="auto"
                  height={500}
                />
              </div>
              <div style={{ padding: 40 }}>
                <p style={bigCardHeader}>
                  SHARE <br /> RECOMMENDATIONS
                </p>
                <p style={bigCardSubHeader}>
                  Share your gaming discoveries effortlessly with friends on
                  Discord. Whether it's a hidden gem or a classic favorite, our
                  integration lets you send detailed recommendations directly to
                  your Discord server's channels.
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
