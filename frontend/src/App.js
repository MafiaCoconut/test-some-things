import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import muiTheme from './theme/muiTheme';
import LandingPage from "./components/LandingPage";
import AllCollectionsPage from "./components/pages/AllCollectionsPage";
import CollectionPage from "./components/pages/CollectionPage";
import UserPage from "./components/pages/UserPage";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;