import React, { useEffect } from "react";
import Title from "../components/Title";

const Browse = () => {
  useEffect(() => {
    document.title = "Reelspark - Browse";
  }, []);

  return (
    <section className="container px-4 py-10">
      <Title title="Browse" />
    </section>
  );
};

export default Browse;
