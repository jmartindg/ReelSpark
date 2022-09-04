type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return <h2 className="border-l-4 border-yellow-500 pl-2 text-2xl font-semibold">{title}</h2>;
};

export default Title;
