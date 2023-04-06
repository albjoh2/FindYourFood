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
    if (!location) {
      alert("Please allow location permission and try again.");
      return;
    }

    search(radius)
      .then((hasResults) => {
        if (!hasResults) {
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

  async function search(radius) {
    try {
      const response = await axios.get(
        `${SERVER_URL}/search?latitude=${location[0]}&longitude=${location[1]}&radius=${radius}&limit=50`
      );
      dispatch(setRestaurants(response.data.businesses));
      return !!response.data.businesses;
    } catch (error) {
      console.error(error);
      throw new Error("An error occurred while searching for restaurants.");
    }
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
