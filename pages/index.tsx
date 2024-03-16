import BillBoard from "@/components/billBoard";
import InfoModal from "@/components/infoModal";
import MovieList from "@/components/movieList";
import Navbar from "@/components/navbar";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import useInfoModal from "@/hooks/useInfoModal";
import useMovieList from "@/hooks/useMovieList";
import useSeriesList from "@/hooks/useSeriesList";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { useMemo, useState } from "react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: series = [] } = useSeriesList();
  const { data: favorties = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();
  const [searchValue, setSearchValue] = useState("");

  const filteredData = useMemo(() => {
    const filterMovie = movies.filter((element: any) =>
      element.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    const filterSeries = series.filter((element: any) =>
      element.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    if (!filterMovie && !filterSeries) {
      return { movies, series };
    }
    return { movies: filterMovie, series: filterSeries };
  }, [movies, searchValue, series]);
  return (
    <>
      <InfoModal visible={isOpen} onClose={closeModal} />
      <Navbar setSearchValue={setSearchValue} />
      <BillBoard />
      <div className="pb-40">
        <MovieList
          title="Trending Now"
          data={filteredData?.movies}
          type="movie"
        />
        <MovieList title="My List" data={favorties} type="movie" />
        <MovieList title="Series" data={filteredData.series} type="series" />
      </div>
    </>
  );
}
