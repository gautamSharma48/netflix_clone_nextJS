import useMovie from "@/hooks/useMovie";
import useSeries from "@/hooks/useSeries";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId, type } = router.query;
  const [data, setData] = useState<any>({});
  const [videoPlayerFocused, setVideoPlayerFocused] = useState(false);
  const movieData = useMovie(movieId as string);
  const seriesData = useSeries(movieId as string);

  useEffect(() => {
    if (type === "movie") {
      // Use movieData
      setData(movieData.data);
    } else if (type === "series") {
      // Use sreisData
      setData(seriesData.data);
    }
  }, [type, movieId, movieData, seriesData]);

  return (
    <div className="h-screen w-screen bg-black">
      <nav
        className={`fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 ${
          videoPlayerFocused ? "invisible" : "visible"
        }`}
      >
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="text-white  cursor-pointer"
          size={40}
        />
        <p className="text-white text-xl md:text-3xl font-bold">
          <span className="font-light">Watching: </span>
          {data?.title}
        </p>
      </nav>
      <video
        controls
        className="w-full h-full"
        src={data?.videoUrl}
        onPlay={() => setVideoPlayerFocused(true)}
        onPause={() => setVideoPlayerFocused(false)}
      ></video>
    </div>
  );
};

export default Watch;
