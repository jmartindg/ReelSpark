import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const getBackdropImage = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1`
  );
  return res.data.results[Math.floor(Math.random() * 21)].backdrop_path;
};

const Hero = () => {
  const { data } = useQuery(["backdrop"], getBackdropImage, { refetchOnWindowFocus: false, keepPreviousData: true });
  const imgUrl = "https://image.tmdb.org/t/p/original/" + data;

  return (
    <section>
      <div style={{ backgroundImage: `url(${imgUrl})` }} className="hero-container object-cover">
        <div className="absolute inset-x-0 top-0 h-full w-full bg-black opacity-60"></div>
        <div className="container z-50 px-4">
          <h1 className="hero-text">Browse and Discover collections of Movies and TV Shows for free.</h1>
        </div>
        <div className="container z-50 px-4 text-center lg:text-left">
          <Link to="/browse" className="hero-cta">
            Browse
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
