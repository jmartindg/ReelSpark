import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import NoImage from "../../assets/no-img.jpg";

interface CardProps {
  id: number;
  title: string;
  date: string;
  poster: string;
  rating: number | string;
  path: string;
}

const Card = ({ id, title, date, poster, rating, path }: CardProps) => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  if (rating === 0) {
    rating = "No Ratings Yet";
  }

  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", timeFormat);

  return (
    <article className="overflow-hidden rounded bg-[#1A1A1A]">
      <Link to={`/${path}/${id}`}>
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
        <div className="flex items-center pb-1">
          <AiFillStar size={18} className="mr-1 text-yellow-500" />{" "}
          <span className="truncate text-sm text-gray-300 md:text-base">{Number(rating).toFixed(1)}</span>
        </div>
        <Link to={`/${path}/${id}`}>
          <h3 className="truncate font-medium hover:underline">{title}</h3>
        </Link>
        <span className="text-sm font-light">{formattedDate(date)}</span>
      </section>
    </article>
  );
};

export default Card;
