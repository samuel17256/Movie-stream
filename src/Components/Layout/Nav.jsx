import { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = search.trim();
    if (!query) return;

    setSearch("");
    setIsMenuOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-black/90 shadow-2xl px-6  relative">
      <nav className="max-w-7xl py-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-red-600">NanStream</h1>
        </div>

        <ul className="hidden md:flex space-x-6 items-center text-gray-400 font-medium">
          <li><a href="/" className="hover:text-gray-300 transition">Home</a></li>
          <li><a href="/movie" className="hover:text-gray-300 transition">Movies</a></li>
          <li><a href="/tv-shows" className="hover:text-gray-300 transition">TV Shows</a></li>
          <li><a href="#" className="hover:text-gray-300 transition">My List</a></li>
        </ul>

        <form
          onSubmit={handleSearch}
          className="hidden md:flex items-center border rounded-md px-2 bg-gray-100 focus-within:ring-2 focus-within:ring-red-500"
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search movies..."
            className="px-3 py-2 bg-transparent outline-none text-sm text-gray-800"
          />
          <button type="submit" className="text-red-600 hover:text-red-700 p-2">
            <FaSearch />
          </button>
        </form>

        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-400 hover:text-white text-xl p-2"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      <div className={`
        fixed top-0 right-0 h-full w-64 bg-gray-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-red-600">Menu</h2>
            <button
              onClick={closeMenu}
              className="text-gray-400 hover:text-white text-xl p-2"
            >
              <FaTimes />
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="mb-6 flex items-center border rounded-md px-2 bg-gray-100 focus-within:ring-2 focus-within:ring-red-500"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies..."
              className="flex-1 px-3 py-2 bg-transparent outline-none text-sm text-gray-800"
            />
            <button type="submit" className="text-red-600 hover:text-red-700 p-2">
              <FaSearch />
            </button>
          </form>

          <ul className="space-y-4">
            <li>
              <a 
                href="/" 
                className="block text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition"
                onClick={closeMenu}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="/movie" 
                className="block text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition"
                onClick={closeMenu}
              >
                Movies
              </a>
            </li>
            <li>
              <a 
                href="/tv-shows" 
                className="block text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition"
                onClick={closeMenu}
              >
                TV Shows
              </a>
            </li>
            <li>
              <a 
                href="/my-list" 
                className="block text-gray-300 hover:text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition"
                onClick={closeMenu}
              >
                My List
              </a>
            </li>
          </ul>

          <div className="absolute bottom-4 left-4 right-4">
            <div className="border-t border-gray-700 pt-4">
              <p className="text-gray-500 text-sm text-center">
                © 2024 NanStream
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;