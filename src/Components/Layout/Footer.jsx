import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-red-900 to-gray-800 text-gray-300 mt-10 px-6">
      <div className="max-w-7xl  py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">NanStream</h1>
          <p>
            Your ultimate destination for streaming top-rated movies, trending
            TV shows, and exclusive originals all in one place.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Movies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                TV Shows
              </a>
            </li>
          </ul>
        </div>
    
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">
            Follow Us for more information
          </h2>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white text-xl">
              <FaFacebook />
            </a>
            <a href="https://x.com/home" className="hover:text-white text-xl">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-white text-xl">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-6">
        <p className="text-center py-4 text-sm">
          &copy; {new Date().getFullYear()} NanStream. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
