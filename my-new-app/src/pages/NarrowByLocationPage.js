import axios from "axios";
import { useState } from "react";
import RadiusInput from "../components/RadiusInput";
import LocationPermission from "../components/LocationPermission";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRestaurants } from "../reducer";

export default function NarrowByLocationPage({ SERVER_URL }) {
  const DEFAULT_RADIUS = 20000;
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const dispatch = useDispatch(); // move the useDispatch hook here

  function handleSubmit() {
    search(radius)
      .then((found) => {
        if (!found) {
          alert("No results found");
          return;
        }
        navigate("/narrow-by-price");
      })
      .catch((error) => {
        console.error(error);
        // Display an error message or handle specific errors differently
      });
  }

  function search(radius) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${SERVER_URL}/search?latitude=${location[0]}&longitude=${location[1]}&radius=${radius}&limit=50`
        )
        .then((response) => {
          dispatch(setRestaurants(response.data.businesses)); // use the dispatch function here
          resolve(!!response.data.businesses); // resolve with a boolean value
        })
        .catch(reject);
    });
  }

  return (
    <div>
      <LocationPermission setLocation={setLocation} />
      <form onSubmit={(e) => e.preventDefault()}>
        <RadiusInput
          onValueChange={setRadius}
          DEFAULT_RADIUS={DEFAULT_RADIUS}
        />{" "}
        {/* pass a function to onValueChange prop */}
        <div>
          <button onClick={handleSubmit} type="submit">
            Next step
          </button>
        </div>
      </form>
    </div>
  );
}
