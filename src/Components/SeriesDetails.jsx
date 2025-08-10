import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";
const PROFILE_SIZE = "w200";

const SeriesDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tv-details", id],
    queryFn: async () => {
      const [seriesRes, creditsRes] = await Promise.all([
        fetch(`${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`),
        fetch(`${BASE_URL}/tv/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`),
      ]);

      const seriesData = await seriesRes.json();
      const creditsData = await creditsRes.json();

      return { series: seriesData, cast: creditsData.cast };
    },
  });

  if (isLoading) return <p className="text-center mt-4">Details Loading...</p>;
  if (isError || data.series.success === false)
    return <p className="text-red-500 text-center">Error loading TV series</p>;

  const { series, cast } = data;

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Series Details */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${series.poster_path}`}
            alt={series.name}
            className="rounded-xl w-full md:w-1/3 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
              {series.name}
            </h1>
            <p className="text-gray-400 text-sm mb-4">
              First Air Date: {series.first_air_date}
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              {series.overview}
            </p>
          </div>
        </div>

        {/* Cast */}
        <h2 className="text-2xl font-semibold text-gray-200 mt-8 mb-4">
          Top Cast
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cast.slice(0, 12).map((actor) => (
            <div
              key={actor.credit_id}
              className="bg-gray-700 rounded-lg overflow-hidden shadow hover:scale-105 transition-transform"
            >
              <img
                src={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${PROFILE_SIZE}${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="w-full object-cover"
              />
              <div className="p-2 text-center">
                <p className="text-white text-sm font-medium">
                  {actor.name}
                </p>
                <p className="text-gray-400 text-xs">
                  as {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesDetails;
