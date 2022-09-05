import { useState } from "react";

type ReadMoreProps = {
  children: string;
  maxCharacterCount: number;
};

const ReadMore = ({ children, maxCharacterCount = 100 }: ReadMoreProps) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const text = children;
  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

  const toggleIsTruncated = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <div>
      <p className="leading-6">{resultString}</p>
      <button
        onClick={toggleIsTruncated}
        className="mt-2 inline-block cursor-pointer rounded bg-yellow-500 px-2 py-1 text-xs font-medium text-black"
      >
        {isTruncated ? <>Read More &darr;</> : <>Read Less &uarr;</>}
      </button>
    </div>
  );
};

export default ReadMore;
