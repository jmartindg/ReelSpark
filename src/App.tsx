import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from "react-router-dom";

// Components
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

// Pages
import ActorDetails from "./pages/actors/ActorDetails";
import Browse from "./pages/Browse";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/movies/MovieDetails";
import TVShows from "./pages/TVShows";
import TvShowDetails from "./pages/tvShows/TvShowDetails";

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
        {/* Actor Details Page */}
        <Route path="/actor-details/:id" element={<ActorDetails />} />
        {/* 404 Page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
