import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Card from "../cards/Card";

interface Similar {
  id: number;
  title: string;
  name: string;
  release_date: string;
  first_air_date: string;
  poster_path: string;
  vote_average: number;
}

interface Type {
  type: string;
  showPath: string;
}

const Similar = ({ type, showPath }: Type) => {
  const getSimilarMovies = async (id: string | number | undefined) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
    );
    return res.data.results;
  };

  let { id } = useParams();
  const { data, status } = useQuery(["similarMovies", id], () => getSimilarMovies(id), { refetchOnWindowFocus: false });

  return (
    <section className="container mx-auto mb-16 px-4">
      <h2 className="mb-7 mt-12 border-l-4 border-yellow-500 pl-2 text-2xl font-semibold">You may also like</h2>

      {status === "success" && (
        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          modules={[Navigation, A11y]}
          navigation
          watchSlidesProgress
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
          {data.map((similar: Similar) => (
            <SwiperSlide key={similar.id}>
              <Card
                id={similar.id}
                title={similar.title || similar.name}
                date={similar.release_date || similar.first_air_date}
                poster={similar.poster_path}
                rating={similar.vote_average}
                path={showPath}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Similar;
