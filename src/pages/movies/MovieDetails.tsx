import React, { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import NoImage from "../../assets/no-img.jpg";

// Components
import Loader from "../../components/placeholders/Loader";
import ErrorMessage from "../../components/placeholders/ErrorMessage";
import Cast from "../../components/details/Cast";
import Reviews from "../../components/details/Reviews";
import MovieMoreInfo from "../../components/details/MovieMoreInfo";
import Similar from "../../components/details/Similar";

interface Metadata {
  id: number;
  name: string;
  english_name: string;
}

const getMovieDetails = async (id: string | number | undefined) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
  );
  return res.data;
};

const MovieDetails = () => {
  let { id } = useParams();
  const { data, status } = useQuery(["movieDetails", id], () => getMovieDetails(id), { refetchOnWindowFocus: false });
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const shortTimeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
  };

  const fullTimeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const shortFormattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", shortTimeFormat);
  const fullFormattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", fullTimeFormat);

  // Format movie runtime - HH:MM
  const minuteToHours = (min: number) => {
    const num = min;
    const hours = min / 60;
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return rhours + "h " + rminutes + "m";
  };

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    scrollToTop();

    if (status === "success") {
      document.title = data.title;
    }

    // Fetch movie details once the page is loaded
  }, [data]);

  return (
    <section>
      {status === "error" && <ErrorMessage error="Error Fetching Data" />}

      {status === "loading" && (
        <section className="px-4 lg:px-0">
          <div className="container mx-auto flex min-h-screen items-center justify-center">
            <Loader />
          </div>
        </section>
      )}

      {/* Hero section */}
      {status === "success" && (
        <section
          style={{ backgroundImage: `url(${imgUrl + data.backdrop_path})` }}
          className="relative bg-gray-800 bg-cover bg-no-repeat"
        >
          <div className="absolute inset-x-0 h-full w-full bg-[#131312] bg-opacity-80"></div>
          <div className="container mx-auto flex min-h-screen flex-col items-center gap-8 px-4 py-16 lg:flex-row lg:px-0 lg:py-0">
            {/* Movie poster image */}
            <section className="flex-2 z-10">
              {data.poster_path ? (
                <img src={imgUrl + data.poster_path} className="mx-auto w-64 rounded md:w-80" alt={data.title} />
              ) : (
                <img src={NoImage} className="mx-auto w-64 rounded md:w-80" alt={data.title} />
              )}
            </section>
            <section className="z-10 flex-1">
              {/* Movie title & release year */}
              <h2 className="text-2xl font-bold lg:text-3xl">
                {data.title} <span className="font-normal text-gray-300">({shortFormattedDate(data.release_date)})</span>
              </h2>

              {/* Movie full release date, genre, and runtime */}
              <p className="pt-2 text-sm font-light tracking-wide md:text-base">
                {fullFormattedDate(data.release_date)} &bull;{" "}
                {data.genres.map((genre: Metadata, index: number) => (
                  <span key={genre.id}>{(index ? ", " : "") + genre.name}</span>
                ))}{" "}
                &bull; <span>{minuteToHours(data.runtime)}</span>
              </p>

              {/* Movie rating */}
              <div className="my-4 flex items-center">
                <AiFillStar size={25} className="mr-1 text-yellow-500" />{" "}
                <span className="truncate text-base text-gray-300 md:text-lg">{Number(data.vote_average).toFixed(1)}</span>
              </div>

              {/* Movie tagline */}
              {data.tagline && <span className="text-lg italic text-gray-300">{data.tagline}</span>}

              {/* Movie overview */}
              <div className="my-4">
                <h3 className="pb-2 text-xl font-semibold text-gray-50">Overview</h3>
                <p className="text-gray-50">{data.overview}</p>
              </div>

              {/* Movie producers */}
              <div className="my-4">
                <h3 className="pb-2 text-lg font-semibold text-white">Producers</h3>
                <p className="text-white md:text-sm lg:text-base">
                  {data.production_companies.map((production: Metadata, index: number) => (
                    <span key={production.id}>{(index ? ", " : "") + production.name}</span>
                  ))}
                </p>
              </div>

              {/* Movie spoken languages */}
              <div>
                <h3 className="pb-2 text-lg font-semibold text-white">Spoken Languages</h3>
                <p className="text-white md:text-sm lg:text-base">
                  {data.spoken_languages.map((language: Metadata, index: number) => (
                    <span key={language.id}>{(index ? ", " : "") + language.english_name}</span>
                  ))}
                </p>
              </div>
            </section>
          </div>
        </section>
      )}

      {status === "success" && (
        <>
          <Cast type="movie" />
          <section className="container mx-auto gap-6 px-4 md:grid md:grid-cols-12">
            <div className="md:col-span-8">
              {/* Movie reviews */}
              <Reviews type="movie" />
            </div>
            <div className="md:col-span-4">
              {/* Movie info */}
              {status === "success" && (
                <MovieMoreInfo website={data.homepage} status={data.status} budget={data.budget} revenue={data.revenue} />
              )}
            </div>
          </section>

          {/* Similar movies */}
          <Similar type="movie" showPath="movie-details" />
        </>
      )}
    </section>
  );
};

export default MovieDetails;
