import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AllCollectionsPage from "./components/pages/AllCollectionsPage";
import CollectionPage from "./components/pages/CollectionPage";
import UserPage from "./components/pages/UserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/collections" element={<AllCollectionsPage />} />
          <Route path="/collection/:id" element={<CollectionPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;