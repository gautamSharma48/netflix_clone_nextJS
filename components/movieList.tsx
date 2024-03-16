import useMovieList from "@/hooks/useMovieList";
import { isEmpty } from "lodash";
import React, { useCallback, useState } from "react";
import MovieCard from "./movieCard";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

interface MovieListProps {
  data: any;
  title: string;
  type: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title = "", type }) => {
  const [startIndex, setStarIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(4);

  const handleIndexNavigator = useCallback((navigater: string) => {
    if (navigater === "next") {
      setStarIndex((prev) => prev + 1);
      setEndIndex((prev) => prev + 1);
      return;
    } else {
      setStarIndex((prev) => prev - 1);
      setEndIndex((prev) => prev - 1);
    }
  }, []);

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8  ">
      <p
        id={type}
        className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4"
      >
        {title}
      </p>
      <div className="grid grid-cols-4  gap-2 relative">
        {startIndex > 0 ? (
          <div className="absolute h-full z-10  transition -translate-x-[7.5]">
            <div
              onClick={() => handleIndexNavigator("prev")}
              className="flex items-center justify-center h-full bg-zinc-800 brightness-80 cursor-pointer"
            >
              <FaCaretLeft className="text-white" size={30} />
            </div>
          </div>
        ) : null}

        {data.slice(startIndex, endIndex)?.map((movie: any) => (
          <MovieCard key={movie.id} data={movie} type={type} />
        ))}
        {data.length > 4 && endIndex < data.length ? (
          <div className="absolute h-full z-10 right-0 transition translate-x-5 lg:translate-x-8">
            <div
              onClick={() => handleIndexNavigator("next")}
              className="flex items-center justify-center h-full bg-zinc-800 brightness-80  cursor-pointer"
            >
              <FaCaretRight className="text-white" size={30} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MovieList;
