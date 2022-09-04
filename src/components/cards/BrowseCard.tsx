import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import NoImage from "../../assets/no-img.jpg";

interface BrowseCardProps {
  id: number;
  title: string;
  date: string;
  poster: string;
  rating: number | string;
  media: string | undefined;
  known: string | undefined;
}

const BrowseCard = ({ id, title, date, poster, rating, media, known }: BrowseCardProps) => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  // Check movie or tv show rating
  if (rating === 0) {
    rating = "No Ratings Yet";
  }

  // Check if media is movie or tv show or person
  const checkMediaType = (media: string | undefined) => {
    switch (media) {
      case "movie":
        return "/movie-details/" + id;
        break;
      case "tv":
        return "/tv-show-details/" + id;
        break;
      default:
        return "/actor-details/" + id;
    }
  };

  // Format date
  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", timeFormat);

  return (
    <article className="overflow-hidden rounded bg-[#1A1A1A]">
      <Link to={checkMediaType(media)}>
        {poster ? (
          <img src={imgUrl + poster} className="aspect-[10/14] cursor-pointer transition hover:opacity-60" alt={title} />
        ) : (
          <img
            src={NoImage}
            className="aspect-[10/14] cursor-pointer object-cover transition hover:opacity-60"
            alt={title}
          />
        )}
      </Link>
      <section className="py-4 px-3">
        {rating ? (
          <div className="flex items-center pb-1">
            <AiFillStar size={18} className="mr-1 text-yellow-500" />{" "}
            <span className="truncate text-sm text-gray-300 md:text-base">{rating}</span>
          </div>
        ) : (
          ""
        )}
        <Link to={checkMediaType(media)}>
          <h3 className="truncate font-medium hover:underline">{title}</h3>
        </Link>
        {rating ? (
          <span className="text-sm font-light">{formattedDate(date)}</span>
        ) : (
          <span className="text-sm font-light">{known}</span>
        )}
      </section>
    </article>
  );
};

export default BrowseCard;
