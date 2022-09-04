import { RiMovie2Fill } from "react-icons/ri";

const StartSearching = () => {
  return (
    <section className="px-4 lg:px-0">
      <div className="flex h-screen flex-col items-center justify-center pb-24">
        <RiMovie2Fill className="text-yellow-500" size={50} />
        <p className="pt-3 text-center md:text-lg">
          Nothing to show here or no results found. <br /> Start searching.
        </p>
      </div>
    </section>
  );
};

export default StartSearching;
