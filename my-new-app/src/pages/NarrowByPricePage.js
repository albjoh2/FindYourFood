import axios from "axios";
import { useState } from "react";
import PriceInput from "../components/PriceInput";
import LocationPermission from "../components/LocationPermission";
import { useNavigate } from "react-router-dom";

export default function NarrowByPricePage({ SERVER_URL }) {
  const DEFAULT_PRICE = 2;
  const navigate = useNavigate();
  const [restaurantData, setRestaurantData] = useState([]);
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState(DEFAULT_PRICE); // initialize radius state with default value

  function handleSubmit() {
    search(price);
    navigate("/narrow-by-category");
  }

  async function search(price) {
    try {
      const response = await axios.get(
        `${SERVER_URL}/search?latitude=${location[0]}&longitude=${location[1]}&radius=${price}&limit=50`
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
        <PriceInput onValueChange={setPrice} DEFAULT_PRICE={DEFAULT_PRICE} />{" "}
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
