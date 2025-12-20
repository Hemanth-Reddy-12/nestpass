import { Route, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/landing_pages/LandingPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
