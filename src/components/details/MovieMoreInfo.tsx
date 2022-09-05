interface MovieMoreInfoProps {
  website: string;
  status: string;
  budget: number;
  revenue: number;
}

const MovieMoreInfo = ({ website, status, budget, revenue }: MovieMoreInfoProps) => {
  return (
    <section className="mt-4 md:mt-0">
      <h2 className="mb-[2rem] border-l-4 border-yellow-500 pl-2 text-2xl font-semibold">More Info</h2>
      <article className="truncate rounded bg-[#131312] p-6">
        <h3 className="font-bold">Website</h3>
        {website ? (
          <a href={website} className="font-light text-gray-50 transition hover:text-yellow-500" target="_blank">
            {website}
          </a>
        ) : (
          <p className="font-light text-gray-50">No website found</p>
        )}
        <h3 className="pt-3 font-bold">Status</h3>
        <p className="font-light">{status ? status : "-"}</p>
        <h3 className="pt-3 font-bold">Budget</h3>
        <p className="font-light">{budget ? `$ ${budget.toLocaleString()}` : "-"}</p>
        <h3 className="pt-3 font-bold">Revenue</h3>
        <p className="font-light">{revenue ? `$ ${revenue.toLocaleString()}` : "-"}</p>
      </article>
    </section>
  );
};

export default MovieMoreInfo;
