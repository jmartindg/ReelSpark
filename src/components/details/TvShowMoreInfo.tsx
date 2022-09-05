interface TvShowMoreInfoProps {
  website: string;
  first_air: string;
  last_air: string;
  episodes: number;
  seasons: number;
  status: string;
  type: string;
  networks: { name: string }[];
}

const TvShowMoreInfo = ({
  website,
  first_air,
  last_air,
  episodes,
  seasons,
  status,
  type,
  networks,
}: TvShowMoreInfoProps) => {
  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = (date: string) => new Date(date).toLocaleDateString("en-US", timeFormat);

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
        <h3 className="pt-3 font-bold">First Air Date</h3>
        <p className="font-light">{first_air ? formattedDate(first_air) : "-"}</p>
        <h3 className="pt-3 font-bold">Last Air Date</h3>
        <p className="font-light">{last_air ? formattedDate(last_air) : "-"}</p>
        <h3 className="pt-3 font-bold">Total Number of Episodes</h3>
        <p className="font-light">{episodes ? episodes : "-"}</p>
        <h3 className="pt-3 font-bold">Seasons</h3>
        <p className="font-light">{seasons ? seasons : "-"}</p>
        <h3 className="pt-3 font-bold">Status</h3>
        <p className="font-light">{status ? status : "-"}</p>
        <h3 className="pt-3 font-bold">Type</h3>
        <p className="font-light">{type ? type : "-"}</p>
        <h3 className="pt-3 font-bold">Network(s)</h3>
        {networks.map((network, index) => (
          <span key={index}>{(index ? ", " : "") + network.name}</span>
        ))}
      </article>
    </section>
  );
};

export default TvShowMoreInfo;
