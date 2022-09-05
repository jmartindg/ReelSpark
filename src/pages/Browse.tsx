import React, { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Title from "../components/Title";
import Loader from "../components/placeholders/Loader";
import StartSearching from "../components/placeholders/StartSearching";
// import ErrorMessage from "../components/placeholders/ErrorMessage";
import SearchBar from "../components/SearchBar";
import BrowseCard from "../components/cards/BrowseCard";

interface BrowseCardProps {
  id: number;
  title: string;
  name: string;
  date: string;
  first_air_date: string;
  release_date: string;
  poster: string;
  poster_path: string;
  profile_path: string;
  rating: number | string;
  vote_average: number | string;
  media: string | undefined;
  media_type: string | undefined;
  known: string | undefined;
  known_for_department: string | undefined;
}

const multiSearch = async (searchValue: string) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${
      import.meta.env.VITE_TMDB_API_KEY
    }&language=en-US&query=${searchValue}&page=1&include_adult=false`
  );
  return res.data.results;
};

const Browse = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, status, fetchStatus } = useQuery(["search", searchValue], () => multiSearch(searchValue), {
    refetchOnWindowFocus: false,
    enabled: searchValue.length > 3 || searchValue.length === 3,
  });

  // Handle search input results
  const submit = (event: any) => {
    event.preventDefault();
    const search = new FormData(event.target as any).get("search");

    if (search) {
      setSearchValue(search as string);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    document.title = "Reelspark - Browse";
  }, []);

  return (
    <section className="container min-h-screen px-4 py-10">
      <header className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <Title title="Browse" />
        <SearchBar submit={submit} searchValue={searchValue} handleChange={handleChange} />
      </header>

      {searchValue.length < 3 && fetchStatus === "idle" && <StartSearching />}

      {status === "loading" && (
        <section className="flex min-h-screen justify-center">
          <Loader />
        </section>
      )}

      {status === "success" &&
        (data.length === 0 ? (
          <StartSearching />
        ) : (
          <section className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
            {data.map((result: BrowseCardProps) => (
              <BrowseCard
                key={result.id}
                id={result.id}
                title={result.name || result.title}
                date={result.first_air_date || result.release_date}
                poster={result.poster_path || result.profile_path}
                rating={result.vote_average}
                media={result.media_type}
                known={result.known_for_department}
              />
            ))}
          </section>
        ))}
    </section>
  );
};

export default Browse;
