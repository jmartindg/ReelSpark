import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Title from "../Title";
import Card from "../cards/Card";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const getPopularMovies = async () => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1&region=ph`
  );
  return res.data.results;
};

const PopularMovies = () => {
  const { data, status } = useQuery(["popularMovies"], getPopularMovies, { refetchOnWindowFocus: false });

  return (
    <section className="my-6">
      <Title title="Popular Movies" />
      <p className="pt-3 text-zinc-400">This week's popular movies</p>

      <section className="my-4">
        {status === "success" && (
          <Swiper
            spaceBetween={20}
            slidesPerView={5}
            modules={[Navigation, A11y]}
            navigation
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
              // when window width is >= 120px
              120: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              // when window width is >= 320px
              320: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              // when window width is >= 480px
              480: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              // when window width is >= 520px
              520: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              // when window width is >= 740px
              740: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
          >
            {data.map((movie: any) => (
              <SwiperSlide key={movie.id}>
                <Card
                  id={movie.id}
                  title={movie.title}
                  date={movie.release_date}
                  poster={movie.poster_path}
                  rating={movie.vote_average}
                  path="movie-details"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </section>
    </section>
  );
};

export default PopularMovies;
