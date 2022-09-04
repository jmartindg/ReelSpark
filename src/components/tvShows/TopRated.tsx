import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import ColumnCard from "../cards/ColumnCard";

const getTopRatedTvShows = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&region=ph`
  );
  return res.data.results;
};

const TopRated = () => {
  const { data, status } = useQuery(["topRatedTvShows"], getTopRatedTvShows, { refetchOnWindowFocus: false });

  return (
    <section>
      <header className="my-6">
        <Title title="Top Rated" />
        <p className="pt-3 text-zinc-400">Top rated TV shows</p>
      </header>

      {status === "success" && (
        <div className="flex flex-col gap-3 md:gap-5">
          {data
            .map((onTheAir: any) => (
              <ColumnCard
                key={onTheAir.id}
                id={onTheAir.id}
                title={onTheAir.name}
                date={onTheAir.first_air_date}
                poster={onTheAir.poster_path}
                path="tv-show-details"
              />
            ))
            .slice(0, 4)}
        </div>
      )}
    </section>
  );
};

export default TopRated;
