import { useQuery } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom"; 

const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const POSTER_SIZE = "w200";

const MovieSeries = () => {
  const moviesURL = `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["popular-movies"],
    queryFn: () =>
      fetch(moviesURL)
        .then((res) => res.json())
        .then((data) => data.results),
  });

  if (isLoading)
    return <p className="text-center text-gray-900 mt-4">Loading...</p>;
  if (isError) return <p className="text-red-500">Error fetching movies</p>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Popular Movies</h1>
      {data.length === 0 ? (
        <p>No movies found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4">
          {data.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <div className="bg-gray-600 p-2 rounded shadow-md hover:transform hover:scale-x-105 transition-transform duration-200 cursor-pointer">
                <img
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`}
                  alt={movie.title}
                  className="bg-cover rounded w-full"
                />
                <h2 className="text-white mt-2 text-sm font-medium">{movie.title}</h2>
                <p className="text-sm text-gray-200">{movie.release_date}</p>
                <p className="text-xs text-amber-400 font-bold flex space-x-2 items-center">
                  <FaStar />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieSeries;
