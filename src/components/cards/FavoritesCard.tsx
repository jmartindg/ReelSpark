import supabase from "../../config/supabase";
import toast from "react-hot-toast";
import { AiFillStar } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import NoImage from "../../assets/no-img.jpg";

interface FavoritesCardProps {
  id: number;
  title: string;
  date: string;
  poster: string;
  rating: number | string;
  onDelete: (id: number) => void;
}

const FavoritesCard = ({ id, title, date, poster, rating, onDelete }: FavoritesCardProps) => {
  const handleDeleteFavorites = async (e: any) => {
    e.preventDefault();

    const { data, error } = await supabase.from("favorites").delete().eq("id", id).select("*");

    if (error) {
      toast.error(`Error removing ${title} from favorites`, {
        style: {
          borderRadius: "5px",
          background: "#333",
          color: "#fff",
        },
      });
    }

    if (data) {
      onDelete(id);
      toast.success(`${title} has been removed from favorites`, {
        style: {
          borderRadius: "5px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };

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
      {poster ? (
        <img src={imgUrl + poster} className="aspect-[10/14]" alt={title} />
      ) : (
        <img src={NoImage} className="aspect-[10/14] object-cover" alt={title} />
      )}
      <section className="py-4 px-3">
        <div className="flex items-center pb-1">
          <AiFillStar size={18} className="mr-1 text-yellow-500" />{" "}
          <span className="truncate text-sm text-gray-300 md:text-base">{Number(rating).toFixed(1)}</span>
        </div>
        <h3 className="truncate font-medium">{title}</h3>
        <span className="text-sm font-light">{formattedDate(date)}</span>
        <div className="mt-2 w-full">
          <button onClick={handleDeleteFavorites} className="remove-btn">
            <IoMdClose className="mr-1" size={16} />
            Remove
          </button>
        </div>
      </section>
    </article>
  );
};

export default FavoritesCard;
