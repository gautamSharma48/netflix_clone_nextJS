/* eslint-disable @next/next/no-img-element */
import React from "react";
import { BsChevronDown, BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./favoriteButton";
import { useRouter } from "next/router";
import useInfoModal from "@/hooks/useInfoModal";
import { BiChevronDown } from "react-icons/bi";

interface MovieCardProps {
  data: any;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
  const router = useRouter();
  const { openModal } = useInfoModal();
  return (
    <div
      onClick={() => {
        if (window.matchMedia("(max-width: 768px)").matches) {
          return openModal(data?.id);
        }
      }}
      className="group bg-zinc-900 col-span relative  lg:h-[12vw]"
    >
      <img
        className="cursor-pointer object-cover transition duration shadow-xl group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[100px] lg:h-[12vw]"
        src={data?.thumbnailUrl}
        alt="movie"
      />
      <div
        className="opacity-0
       absolute
        top-0
         transition
          duration-200
           z-10
            invisible
             sm:visible
              delay-300
               scale-0
                group-hover:scale-110
                 group-hover:-translate-y-[6vw]
                 group-hover:translate-x-[2vw]
                  group-hover:opacity-100 w-full h-[12vw]"
      >
        <video
          autoPlay
          loop
          muted
          src={data?.videoUrl}
          className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              onClick={() => router.push(`/watch/${data?.id}`)}
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex items-center justify-center transition hover:bg-neutral-300"
            >
              <BsFillPlayFill size={30} />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={() => openModal(data?.id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex items-center justify-center transition hover:bg-neutral-300"
            >
              <BsChevronDown
                className="text-white group-hover/item:text-nutral-300  "
                size={30}
              />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.duration}</p>
          </div>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
