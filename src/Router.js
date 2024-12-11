import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Location from "./pages/location/Location";
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";
import BookMark from "./pages/bookmark/BookMark";
import Header from "./components/Header";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location" element={<Location />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/bookmark" element={<BookMark />} />
      </Routes>
    </HashRouter>
  );
};

export default Router;
