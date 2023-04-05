import { BrowserRouter, Route, Routes } from "react-router-dom";
import NarrowByLocationPage from "./pages/NarrowByLocationPage";
import NarrowByPricePage from "./pages/NarrowByPricePage";
import NarrowByCategoryPage from "./pages/NarrowByCategoryPage";
import Results from "./pages/Results";
import Welcome from "./pages/Welcome";

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
          <Route path="/narrow-by-price" element={<NarrowByPricePage />} />
          <Route
            path="/narrow-by-category"
            element={<NarrowByCategoryPage />}
          />
          <Route path="/results" element={<Results />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
