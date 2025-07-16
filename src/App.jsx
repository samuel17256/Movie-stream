import { Routes, Route } from "react-router";
import PageLayout from "./Components/Layout/PageLayout";
import MovieSeries from "./Pages/MovieSeries";
import Home from "./Pages/Home";
import TvSeries from "./Pages/TvSeries";
import SearchResults from "./Components/SearchResults";

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movie"  element={<MovieSeries />}/>
        <Route path="/tv-shows"  element={<TvSeries />}/>
        <Route path="/search" element={<SearchResults />}/>
      </Route>
    </Routes>
  );
}

export default App;
