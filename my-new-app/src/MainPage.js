import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import NarrowByLocationPage from "./pages/NarrowByLocationPage";
import NarrowByPricePage from "./pages/NarrowByPricePage";
import NarrowByCategoryPage from "./pages/NarrowByCategoryPage";
import Results from "./pages/Results";
import Welcome from "./pages/Welcome";
import LocationPermission from "./components/LocationPermission";

import { Provider } from "react-redux";
import store from "./store";

const SERVER_URL = "http://localhost:8080";

export default function MainPage() {
  const [location, setLocation] = useState(null);
  return (
    <main>
      <LocationPermission setLocation={setLocation} />
      <div id="logo">
        <h1>Find Your Food</h1>
      </div>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/narrow-by-location"
              element={
                <NarrowByLocationPage
                  SERVER_URL={SERVER_URL}
                  location={location}
                />
              }
            />
            <Route path="/narrow-by-price" element={<NarrowByPricePage />} />
            <Route
              path="/narrow-by-category"
              element={<NarrowByCategoryPage />}
            />
            <Route
              path="/results"
              element={<Results SERVER_URL={SERVER_URL} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </main>
  );
}
