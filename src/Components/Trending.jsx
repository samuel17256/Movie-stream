import { useQuery } from "@tanstack/react-query";

const TMDB_API_KEY = '2ca22f700bb9eff7e814bfbe16ba6831'
const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'
const POSTER_SIZE = 'w500'
const BACKDROP_SIZE = 'original'

const Trending = () => {
  const trendingURL = `${BASE_URL}/trending/all/week?api_key=${TMDB_API_KEY}`;
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ["trending"],
    queryFn: () =>
      fetch(trendingURL)
        .then((res) => res.json())
        .then((data) => data.results),
  });

  if (isLoading)
    return <p className="text-center text-gray-900 mt-4">Loading trending content...</p>;
  if (isError) return <p className="text-red-500">Error fetching trending content</p>;

  return (
    <div className="px-6 py-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Trending</h1>
      {data.length === 0 ? (
        <p>No trending content found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {data.map((item) => (
            <div key={item.id} className="bg-gray-800 p-2 rounded shadow">
              <img
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${item.poster_path}`}
                alt={item.title || item.name}
                className="bg-cover rounded w-full hover:transform hover:scale-105 transition-transform duration-200"
              />
              <div className="mt-2 space-y-1">
                <h2 className="text-white text-sm font-medium">
                  {item.media_type === 'movie' ? item.title : item.name}
                </h2>
                <p className="text-xs text-gray-300 capitalize">
                  {item.media_type}
                </p>
                <p className="text-sm text-gray-200">
                  {item.media_type === 'movie' ? item.release_date : item.first_air_date}
                </p>
                <p className="text-xs text-amber-400 font-bold">
                   {item.vote_average.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trending;