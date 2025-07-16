import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

const TMDB_API_KEY = "2ca22f700bb9eff7e814bfbe16ba6831";

function SearchResults({ results, loading, query }) {
  if (loading) {
    return (
      <div className="bg-white text-black px-4 py-4 max-w-7xl mx-auto">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading search results...</div>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="bg-white text-black px-4 py-4 max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-2">
          {query ? `Search Results for "${query}"` : "Search Results"}
        </h2>
        <div className="text-gray-600 text-center py-8">
          {query
            ? `No results found for "${query}"`
            : "No search results to display"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-black px-4 py-4 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-2">
        Search Results for "{query}" {results.length} results
      </h2>
      <ul className="grid grid-cols-1  md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((item) => (
          <li
            key={item.id}
            className="text-sm hover:transform hover:scale-105 transition-transform duration-200"
          >
            <div className="cursor-pointer">
              {item.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
                  alt={item.title || item.name}
                  className="rounded-lg mb-2 w-full h-auto shadow-md"
                />
              ) : (
                <div className="h-48 w-full bg-gray-200 flex items-center justify-center rounded-lg mb-2 shadow-md">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
              <div className="space-y-1">
                <p className="font-medium line-clamp-2 leading-tight">
                  {item.media_type === "movie" ? item.title : item.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {item.media_type}
                </p>
                {item.release_date && (
                  <p className="text-xs text-gray-500">
                    {new Date(item.release_date).getFullYear()}
                  </p>
                )}
                {item.first_air_date && (
                  <p className="text-xs text-gray-500">
                    {new Date(item.first_air_date).getFullYear()}
                  </p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

//Function for movie/series search

function SearchPage() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("q");

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError(null);

      fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query
        )}`
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Search failed");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Search results:", data.results);
          setResults(data.results || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setError(err.message);
          setLoading(false);
        });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (error) {
    return (
      <div className="bg-white text-black px-4 py-4 max-w-7xl mx-auto">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-2 text-red-600">Error</h2>
          <p className="text-gray-600">Something went wrong: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SearchResults results={results} loading={loading} query={query} />
    </div>
  );
}

export default SearchPage;
