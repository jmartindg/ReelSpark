import React, { useEffect } from "react";

// Components
import Hero from "../components/Hero";
import PopularMovies from "../components/movies/PopularMovies";
import PopularTvShows from "../components/tvShows/PopularTvShows";
import NowPlaying from "../components/movies/NowPlaying";
import Upcoming from "../components/movies/Upcoming";
import OnTheAir from "../components/tvShows/OnTheAir";
import TopRated from "../components/tvShows/TopRated";

const Home = () => {
  useEffect(() => {
    document.title = "Reelspark - Discover Movies and TV Shows";
  }, []);

  return (
    <main>
      <Hero />
      <section className="container flex flex-col px-4 py-10">
        <PopularMovies />
        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <NowPlaying />
          <Upcoming />
        </section>
        <PopularTvShows />
        <section className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <OnTheAir />
          <TopRated />
        </section>
      </section>
    </main>
  );
};

export default Home;
