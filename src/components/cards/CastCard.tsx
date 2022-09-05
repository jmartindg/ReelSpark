import React from "react";
import { Link } from "react-router-dom";
import NoImage from "../../assets/no-img.jpg";

interface CastCardProps {
  id: number;
  name: string;
  character: string;
  profile: string;
}

const CastCard = ({ id, name, character, profile }: CastCardProps) => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  return (
    <article>
      <Link to={`/actor-details/${id}`}>
        {profile ? (
          <img
            src={imgUrl + profile}
            className="aspect-[10/14] cursor-pointer rounded transition hover:opacity-60"
            alt={name}
          />
        ) : (
          <img
            src={NoImage}
            className="aspect-[10/14] cursor-pointer rounded object-cover transition hover:opacity-60"
            alt={name}
          />
        )}
      </Link>
      <section className="py-4">
        <Link to={`/actor-details/${id}`}>
          <p className="font-medium hover:underline">{name}</p>
        </Link>
        <p className="pt-1 text-sm font-light text-gray-300">{character}</p>
      </section>
    </article>
  );
};

export default CastCard;
