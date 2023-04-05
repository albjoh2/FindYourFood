import axios from "axios";
import { useState } from "react";
import RadiusInput from "./RadiusInput";
import LocationPermission from "./LocationPermission";

export default function NarrowByLocationPage({ SERVER_URL }) {
  const DEFAULT_RADIUS = 20000;
  const [restaurantData, setRestaurantData] = useState([]);
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(DEFAULT_RADIUS); // initialize radius state with default value

  function handleSubmit() {
    search(radius);
  }

  async function search(radius) {
    try {
      console.log(
        `${SERVER_URL}/search?latitude=${location[0]}&longitude=${location[1]}&radius=${radius}&limit=50`
      );
      const response = await axios.get(
        `${SERVER_URL}/search?latitude=${location[0]}&longitude=${location[1]}&radius=${radius}&limit=50`
      );
      setRestaurantData(response.data.businesses);
      console.log(restaurantData);
    } catch (error) {
      console.error(error);
      // Display an error message or handle specific errors differently
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
