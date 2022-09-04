import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  date: string;
  poster: string;
  path: string;
}

const ColumnCard = ({ id, title, date, poster, path }: Props) => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", timeFormat);

  return (
    <Link to={`/${path}/${id}`}>
      <article className="flex items-center overflow-hidden rounded bg-[#1A1A1A] transition hover:bg-opacity-60">
        <img src={imgUrl + poster} className="h-24 w-16 object-cover" alt={title} />
        <section className="pl-4">
          <h3 className="text-sm font-medium md:text-base">{title}</h3>
          <span className="text-sm font-light">{formattedDate(date)}</span>
        </section>
      </article>
    </Link>
  );
};

export default ColumnCard;
