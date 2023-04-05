import { BrowserRouter, Route, Routes } from "react-router-dom";
import NarrowByLocationPage from "./NarrowByLocationPage";
import NarrowByPricePage from "./NarrowByPricePage";
import Welcome from "./Welcome";

const SERVER_URL = "http://localhost:8080";

export default function MainPage() {
  return (
    <main>
      <h1>Find Your Food</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route
            path="/narrow-by-location"
            element={<NarrowByLocationPage SERVER_URL={SERVER_URL} />}
          />
          <Route
            exact
            path="/narrow-by-price"
            element={<NarrowByPricePage />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
