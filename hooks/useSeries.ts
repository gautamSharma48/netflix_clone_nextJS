import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useSeries = (id: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `/api/series/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
};

export default useSeries;
