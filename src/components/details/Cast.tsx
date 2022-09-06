import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import CastCard from "../cards/CastCard";
import Title from "../Title";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

interface Type {
  type: string;
}

const Cast = ({ type }: Type) => {
  const getMovieCast = async (id: string | number | undefined) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
    );
    return res.data.cast;
  };

  let { id } = useParams();
  const { data, status } = useQuery(["movieCast", id], () => getMovieCast(id), { refetchOnWindowFocus: false });

  useEffect(() => {
    // Fetch cast once the page is loaded
  }, [data]);

  return (
    <section className="container mx-auto px-4 pt-12">
      <header className="mb-6">
        <Title title="Cast" />
      </header>

      {status === "success" && (
        <Swiper
          spaceBetween={20}
          slidesPerView={7}
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
            // when window width is >= 840px
            840: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
        >
          {data.map((cast: Cast) => (
            <SwiperSlide key={cast.id}>
              <CastCard key={cast.id} id={cast.id} name={cast.name} character={cast.character} profile={cast.profile_path} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default Cast;
