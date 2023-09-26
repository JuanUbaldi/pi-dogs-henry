import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

import Nav from "./components/Nav/Nav";
import Detail from "./components/Detail";
import Create from "./components/Create";
import Footer from "./components/Footer";
import "./index.css";
import Error404 from "./components/Error404";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addDogs, allTemperaments } from "./redux/actions";
import HomePage from "./components/HomePage/HomePage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(allTemperaments());
  }, [dispatch]);

  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <Nav />}

      <Routes>
        {<Route path="/" element={<LandingPage />} />}

        <Route path="/home" element={<HomePage />} />

        <Route path="/detail/:id" element={<Detail />}></Route>

        <Route path="/create" element={<Create />}></Route>

        <Route path="*" element={<Error404 />}></Route>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
