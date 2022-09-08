import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import ErrorPage from "./pages/ErrorPage";
import MovieDetails from "./pages/movies/MovieDetails";
import TvShowDetails from "./pages/tvShows/TvShowDetails";
import Browse from "./pages/Browse";
import ActorDetails from "./pages/actors/ActorDetails";
import Favorites from "./pages/Favorites";

// Initialize react-query
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Movies */}
        <Route path="/movies" element={<Movies />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        {/* TV Shows */}
        <Route path="/tv-shows" element={<TVShows />} />
        <Route path="/tv-show-details/:id" element={<TvShowDetails />} />
        {/* Browse Page */}
        <Route path="/browse" element={<Browse />} />
        {/* Favorites Page */}
        <Route path="/favorites" element={<Favorites />} />
        {/* Actor Details Page */}
        <Route path="/actor-details/:id" element={<ActorDetails />} />
        {/* 404 Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
};

export default App;
