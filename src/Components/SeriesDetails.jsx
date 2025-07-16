import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";

const SeriesDetails = () => {
  const { id } = useParams();

  const seriesDetailURL = `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`; // ✅ FIXED

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tv", id],
    queryFn: () => fetch(seriesDetailURL).then((res) => res.json()),
  });

  if (isLoading) return <p className="text-center mt-4">Details Loading...</p>;
  if (isError || data.success === false)
    return <p className="text-red-500 text-center">Error loading TV series</p>;

  return (
    <div className="p-6 flex items-center justify-center">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 max-w-md w-full">
        <img
          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${data.poster_path}`}
          alt={data.name}
          className="rounded-xl mb-4 w-full object-cover"
        />
        <h1 className="text-2xl font-bold text-gray-200 mb-2 text-center">
          {data.name}
        </h1>
        <p className="text-center text-gray-400 text-sm mb-2">
          First Air Date: {data.first_air_date}
        </p>
        <p className="text-gray-300 text-sm leading-relaxed">{data.overview}</p>
      </div>
    </div>
  );
};

export default SeriesDetails;
