import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import muiTheme from './theme/muiTheme';
import LandingPage from "./components/LandingPage";
import AllCollectionsPage from "./components/pages/AllCollectionsPage";
import CollectionPage from "./components/pages/CollectionPage";
import UserPage from "./components/pages/UserPage";
import FriendsPage from "./components/pages/FriendsPage";
import GroupsPage from "./components/pages/GroupsPage";
import DollViewPage from "./components/pages/DollViewPage";
import AboutPage from "./components/pages/AboutPage";
import PrivacyPage from "./components/pages/PrivacyPage";
import TermsPage from "./components/pages/TermsPage";
import HelpPage from "./components/pages/HelpPage";
import ContactPage from "./components/pages/ContactPage";
import PostsPage from "./components/pages/PostsPage";
import SettingsPage from "./components/pages/SettingsPage";
import AchievementsPage from "./components/pages/AchievementsPage";
import WishlistPage from "./components/pages/WishlistPage";
import FriendsPostsPage from "./components/pages/FriendsPostsPage";
import ReleaseHubV1 from "./components/pages/ReleaseHubV1";
import ReleaseHubV2 from "./components/pages/ReleaseHubV2";

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
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/friends-posts" element={<FriendsPostsPage />} />
            <Route path="/groups" element={<GroupsPage />} />
            <Route path="/doll/:id" element={<DollViewPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;