import useBillBoard from "@/hooks/useBillBoard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./playButton";
import useInfoModal from "@/hooks/useInfoModal";

const BillBoard = () => {
  const { data } = useBillBoard() || null;
  const { openModal } = useInfoModal();

  const handleOpenModal = useCallback(() => {
    openModal(data?.id, "movie");
  }, [openModal, data?.id]);
  return (
    <>
      <div className="relative h-[56.25vw] max-h-[600px] w-full">
        <video
          className="w-full  h-[56.25vw] max-h-[600px] object-cover brightness-[60%]"
          src={data?.videoUrl}
          poster={data?.thumbnailUrl}
          autoPlay
          muted
          loop
        />
        <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
          <div className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
            {data?.title}
          </div>
          <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
            {data?.description}
          </p>
          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <PlayButton movieId={data?.id} type="movie" />
            <button
              onClick={handleOpenModal}
              className="bg-white
             text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold 
              flex flex-row items-center hover:bg-opacity-20 transition"
            >
              <AiOutlineInfoCircle className="mr-1" size={25} /> More Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillBoard;
