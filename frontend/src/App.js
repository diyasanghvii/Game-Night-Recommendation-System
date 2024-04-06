import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AuthRoutes from "./router/AuthRoutes";
import SignUp from "./Pages/SignUp";
import EditPreferences from "./Pages/EditPreferences";
import RecommendGames from "./Pages/RecommendGames";
import SignUpGameDetails from "./Pages/SignUpGameDetails";
import SignUpIdDetails from "./Pages/SignUpIdDetails";
import EditProfile from "./Pages/EditProfile";

function App() {
  return (
    <div style={{ backgroundImage: "url('/images/Game Image2.png')" }}>
      <Router>
        <Routes>
          <Route element={<AuthRoutes />}>
            <Route element={<Dashboard />} path="/" exact />
            <Route element={<Dashboard />} path="/dashboard" />
            <Route element={<EditPreferences />} path="/edit-preferences" />
            <Route element={<RecommendGames />} path="/recommend-games" />
            <Route element={<EditProfile />} path="/edit-profile" />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<SignUp />} path="/signup" />
          <Route element={<SignUpIdDetails />} path="/signupiddetails" />
          <Route element={<SignUpGameDetails />} path="/signupgamedetails" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
