import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FiChevronRight } from "react-icons/fi";
import Title from "../Title";
import ColumnCard from "../cards/ColumnCard";

const getNowUpcomingMovies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&page=1&region=ph`
  );
  return res.data.results;
};

const Upcoming = () => {
  const { data, status } = useQuery(["upcomingMovies"], getNowUpcomingMovies, { refetchOnWindowFocus: false });

  return (
    <section>
      <header className="my-6">
        <Title title="Upcoming" />
        <p className="pt-3 text-zinc-400">Upcoming movies in theatres</p>
      </header>

      {status === "success" && (
        <div className="flex flex-col gap-3 md:gap-5">
          {data
            .map((nowPlaying: any) => (
              <ColumnCard
                key={nowPlaying.id}
                id={nowPlaying.id}
                title={nowPlaying.title}
                date={nowPlaying.release_date}
                poster={nowPlaying.poster_path}
                path="movie-details"
              />
            ))
            .slice(0, 4)}
        </div>
      )}
    </section>
  );
};

export default Upcoming;
