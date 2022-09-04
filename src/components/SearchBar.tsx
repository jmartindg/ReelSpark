import { AiOutlineSearch } from "react-icons/ai";

type SearchBarProps = {
  submit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchValue: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchBar = ({ submit, searchValue, handleChange }: SearchBarProps) => {
  return (
    <form onSubmit={submit} className="relative w-full md:w-1/2 lg:w-1/4">
      <input
        type="text"
        name="search"
        placeholder="Search movies, tv shows, actors..."
        value={searchValue}
        onChange={handleChange}
        autoComplete="off"
        className="w-full rounded border-gray-700 bg-[#131312] py-3 pr-12 text-gray-50 placeholder:text-sm focus:border-yellow-500 focus:ring-[1px] focus:ring-yellow-500"
      />
      <AiOutlineSearch size={25} className="absolute top-3 right-4 text-gray-700" />
    </form>
  );
};

export default SearchBar;
