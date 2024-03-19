import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AuthRoutes from "./router/AuthRoutes";
import SignUp from "./Pages/SignUp";
import EditPreferences from "./Pages/EditPreferences";
import RecommendGames from "./Pages/RecommendGames";
import EditProfile from "./Pages/EditProfile";

function App() {
  return (
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
      </Routes>
    </Router>
  );
}

export default App;
