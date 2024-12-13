import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Location from "./pages/location/Location";
import Search from "./pages/search/Search";
import Detail from "./pages/detail/Detail";
import BookMark from "./pages/bookmark/BookMark";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Router = () => {
  return (
    <HashRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/location/:locateNm" element={<Location />} />
        <Route path="/search" element={<Search />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/bookmark" element={<BookMark />} />
      </Routes>
      <Footer />
    </HashRouter>
  );
};

export default Router;
