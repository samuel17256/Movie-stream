import { Routes, Route } from "react-router";
import PageLayout from "./Components/Layout/PageLayout";
import MovieSeries from "./Pages/MovieSeries";
import Home from "./Pages/Home";
import TvSeries from "./Pages/TvSeries";
import SearchResults from "./Components/SearchResults";
import MovieDetails from "./Components/MovieDetails";
import SeriesDetails from "./Components/SeriesDetails"

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<MovieSeries />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv-shows" element={<TvSeries />} />
        <Route  path="/tv/:id" element={<SeriesDetails />}/>
        <Route path="/search" element={<SearchResults />} />
      </Route>
    </Routes>
  );
}

export default App;
