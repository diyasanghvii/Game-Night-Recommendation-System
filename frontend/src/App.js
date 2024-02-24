import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import AuthRoutes from "./router/AuthRoutes";
import SignUp from "./Pages/SignUp";
import EditPreferences from "./Pages/EditPreferences";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthRoutes />}>
          <Route element={<Dashboard />} path="/" exact />
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<EditPreferences />} path="/edit-preferences" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<SignUp />} path="/signup" />
      </Routes>
    </Router>
  );
}

export default App;
