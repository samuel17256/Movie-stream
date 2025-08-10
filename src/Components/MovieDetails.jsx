import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w500";
const PROFILE_SIZE = "w200"; // Actor profile image size

const MovieDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movie-details", id],
    queryFn: async () => {
      const [movieRes, creditsRes] = await Promise.all([
        fetch(`${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`),
        fetch(`${BASE_URL}/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`),
      ]);

      const movieData = await movieRes.json();
      const creditsData = await creditsRes.json();

      return { movie: movieData, cast: creditsData.cast };
    },
  });

  if (isLoading) return <p className="text-center mt-4">Details Loading...</p>;
  if (isError || data.movie.success === false)
    return <p className="text-red-500 text-center">Error loading movie</p>;

  const { movie, cast } = data;

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Movie Details */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl w-full md:w-1/3 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-200 mb-2">
              {movie.title}
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              Release Date: {movie.release_date}
            </p>
            <p className="text-gray-300 text-base leading-relaxed">
              {movie.overview}
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
              key={actor.cast_id}
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

export default MovieDetails;
