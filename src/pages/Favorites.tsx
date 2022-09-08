import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import supabase from "../config/supabase";
import Title from "../components/Title";
import Loader from "../components/placeholders/Loader";
import FavoritesCard from "../components/cards/FavoritesCard";

interface FavoritesData {
  id: number;
  title: string;
  rating: number | string;
  poster_url: string;
  date_released: string;
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoritesData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshFavorites = (id: number) => {
    setFavorites((previousFavorites: any) => {
      return previousFavorites?.filter((favorite: any) => favorite.id !== id);
    });
  };

  useEffect(() => {
    const getFavorites = async () => {
      const { error, data } = await supabase.from("favorites").select("*").order("created_at", { ascending: false });

      if (error) {
        setLoading(true);
        setFavorites(null);
        toast.error(error.message, {
          style: {
            borderRadius: "5px",
            background: "#333",
            color: "#fff",
          },
        });
        setLoading(false);
      }

      if (data) {
        setLoading(true);
        setFavorites(data);
        setLoading(false);
      }
    };

    getFavorites();
  }, []);

  return (
    <section className="container min-h-screen px-4 py-10">
      <Title title="Favorites" />
      {loading && (
        <section className="px-4 lg:px-0">
          <div className="container mx-auto flex min-h-screen items-center justify-center">
            <Loader />
          </div>
        </section>
      )}

      {favorites?.length === 0 ? (
        <section>
          <p className="py-5 text-gray-400">You have no favorites</p>
        </section>
      ) : (
        <section className="my-6 grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
          {favorites?.map((favorite) => (
            <>
              <FavoritesCard
                key={favorite.id}
                id={favorite.id}
                title={favorite.title}
                rating={favorite.rating}
                poster={favorite.poster_url}
                date={favorite.date_released}
                onDelete={refreshFavorites}
              />
            </>
          ))}
        </section>
      )}
    </section>
  );
};

export default Favorites;
