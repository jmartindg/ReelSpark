import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoImage from "../../assets/no-img.jpg";
import ReadMore from "../../components/details/ReadMore";
import Loader from "../../components/placeholders/Loader";

const getActorDetails = async (id: string | number | undefined) => {
  const res = await axios.get(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
  );
  return res.data;
};

const ActorDetails = () => {
  let { id } = useParams();
  const { data, status } = useQuery(["actorDetails", id], () => getActorDetails(id), { refetchOnWindowFocus: false });
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const fullTimeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const fullFormattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", fullTimeFormat);

  const gender = (gender: number) => {
    if (gender === 2) {
      return "Male";
    } else if (gender === 1) {
      return "Female";
    } else {
      return "-";
    }
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
      document.title = data.name;
    }

    // Fetch actor details once the page is loaded
  }, [data]);

  return (
    <>
      {status === "loading" && (
        <section className="px-4 lg:px-0">
          <div className="container mx-auto flex min-h-screen items-center justify-center">
            <Loader />
          </div>
        </section>
      )}

      {status === "success" && (
        <section className="container mx-auto flex min-h-screen flex-col items-center gap-8 px-4 py-16 lg:flex-row lg:px-0 lg:py-0">
          {/* Actor profile image */}
          <section className="flex-2">
            {data.profile_path ? (
              <img src={imgUrl + data.profile_path} className="mx-auto w-64 rounded md:w-80" alt={data.name} />
            ) : (
              <img src={NoImage} className="mx-auto w-64 rounded md:w-80" alt={data.name} />
            )}
          </section>
          <section className="flex-1">
            <h2 className="text-2xl font-bold lg:text-3xl">{data.name}</h2>
            {/* Actor biography */}
            <div className="my-4">
              <h3 className="pb-2 text-xl font-semibold text-gray-50">Biography</h3>
              <p>
                {data.biography.length < 300 ? (
                  data.biography
                ) : (
                  <ReadMore maxCharacterCount={300}>{data.biography}</ReadMore>
                )}
              </p>
            </div>

            <article className="grid grid-cols-1 md:grid-cols-2">
              <section className="my-4">
                <h3 className="pb-2 text-lg font-semibold text-white">Known For</h3>
                <p className="text-white md:text-sm lg:text-base">{data.known_for_department}</p>
              </section>

              <section className="my-4">
                <h3 className="pb-2 text-lg font-semibold text-white">Gender</h3>
                <p className="text-white md:text-sm lg:text-base">{gender(data.gender)}</p>
              </section>

              <section className="my-4">
                <h3 className="pb-2 text-lg font-semibold text-white">Birthday</h3>
                <p className="text-white md:text-sm lg:text-base">{fullFormattedDate(data.birthday)}</p>
              </section>

              <section className="my-4">
                <h3 className="pb-2 text-lg font-semibold text-white">Place of Birth</h3>
                <p className="text-white md:text-sm lg:text-base">{data.place_of_birth}</p>
              </section>
            </article>
          </section>
        </section>
      )}
    </>
  );
};

export default ActorDetails;
