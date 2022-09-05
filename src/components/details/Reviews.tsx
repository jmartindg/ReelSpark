import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import NoAvatar from "../../assets/no-avatar.jpg";
import NoReviews from "../placeholders/NoReviews";
import ReadMore from "./ReadMore";

interface Review {
  id: number;
  author: string;
  name: string;
  author_details: {
    avatar_path: string;
  };
  content: string;
  created_at: string;
}

interface Type {
  type: string;
}

const Reviews = ({ type }: Type) => {
  const getReviews = async (id: string | number | undefined) => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
    );
    return res.data.results;
  };

  let { id } = useParams();
  const { data, status } = useQuery(["reviews", id], () => getReviews(id), { refetchOnWindowFocus: false });
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", timeFormat);

  return (
    <section className="mb-10 md:mb-0">
      <h2 className="mb-4 border-l-4 border-yellow-500 pl-2 text-2xl font-semibold">Reviews</h2>

      {status === "success" &&
        (data.length === 0 ? (
          <NoReviews />
        ) : (
          data
            .map((review: Review) => (
              <section key={review.id} className="flex flex-col">
                <article className="mt-4 rounded bg-[#131312] p-6">
                  <header className="flex items-center space-x-4">
                    {!review.author_details.avatar_path === null ? (
                      <img
                        src={imgUrl + review.author_details.avatar_path}
                        className="w-12 rounded-full"
                        alt={review.author}
                      />
                    ) : (
                      <img src={NoAvatar} className="w-12 rounded-full object-cover" alt={review.name} />
                    )}

                    <div>
                      <h4 className="text-lg font-bold">{review.author}</h4>
                      <p className="text-sm">Posted on {formattedDate(review.created_at)}</p>
                    </div>
                  </header>
                  <div className="pt-4 font-light text-gray-50">
                    {review.content.length < 300 ? (
                      review.content
                    ) : (
                      <ReadMore maxCharacterCount={300}>{review.content}</ReadMore>
                    )}
                  </div>
                </article>
              </section>
            ))
            .slice(0, 3)
        ))}
    </section>
  );
};

export default Reviews;
