
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import FavouritesPage from "./pages/FavouritesPage";
import WatchListPage from "./pages/WatchListPage";
import SettingsPage from "./pages/SettingsPage";
import NoWifi from "./components/NoWifi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <div>
      {!isOnline && <NoWifi />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;