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
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(DEFAULT_RADIUS);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const hasResults = await search(radius);

      setIsLoading(false);

      if (!hasResults) {
        alert("No results found");
        return;
      }

      navigate("/narrow-by-price");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      // Display an error message or handle specific errors differently
    }
  }

  return (
    <div>
      <LocationPermission setLocation={setLocation} />
      <form onSubmit={handleSubmit}>
        <RadiusInput
          onValueChange={setRadius}
          DEFAULT_RADIUS={DEFAULT_RADIUS}
        />
        <div>
          <button disabled={!location || isLoading} type="submit">
            {isLoading ? "Loading..." : "Next step"}
          </button>
        </div>
      </form>
    </div>
  );
}
