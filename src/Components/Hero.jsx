import video from "/Smart City Digital City Video.mp4";

function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
        <div className="text-center text-gray-100 px-6">
          <h2 className="text-3xl font-semibold">Welcome to NanStream</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Unlimited <span className="text-red-600">Movies, TV Shows</span><br /> Anytime.
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-xl mx-auto">
            Discover epic stories, thrilling adventures, and heart-stopping dramas, all streaming in stunning HD.
          </p>
          <a
            href="#"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-lg transition"
          >
            Start Watching
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
