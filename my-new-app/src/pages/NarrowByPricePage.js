import { useState, useEffect } from "react";
import PriceInput from "../components/PriceInput";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurants } from "../reducer";

export default function NarrowByPricePage() {
  const DEFAULT_PRICE = 2;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const restaurants = useSelector((state) => state.restaurants);
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!restaurants) {
      navigate("/results");
    }
  }, [navigate, restaurants]);

  function filterByPrice(restaurantPrice) {
    if (!restaurantPrice && parseInt(price) > 1) {
      return false;
    }
    return restaurantPrice && restaurantPrice.length === parseInt(price);
  }

  function handleClick() {
    setIsLoading(true);
    const filteredRestaurants = restaurants.filter((restaurant) => {
      return filterByPrice(restaurant.price);
    });
    if (filteredRestaurants.length === 0) {
      setIsLoading(false);
      alert("No results at this price level. Please try again.");
      return;
    }
    dispatch(setRestaurants(filteredRestaurants));
    setIsLoading(false);
    navigate("/narrow-by-category");
  }

  return (
    <div>
      <PriceInput onValueChange={setPrice} DEFAULT_PRICE={DEFAULT_PRICE} />
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <button onClick={handleClick} type="submit">
            Next step
          </button>
        )}
      </div>
    </div>
  );
}
