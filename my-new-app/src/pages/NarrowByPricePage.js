import { useState } from "react";
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

  function handleClick() {
    if (!restaurants) {
      navigate("/results");
      return;
    }
    const filteredRestaurants = restaurants.filter((restaurant) => {
      if (restaurant.price) {
        return (
          restaurant.price.length === parseInt(price) ||
          restaurant.price.length === parseInt(price) - 1 ||
          restaurant.price.length === parseInt(price) + 1
        );
      } else {
        if (parseInt(price) < 3) {
          return true;
        }
      }
    });
    dispatch(setRestaurants(filteredRestaurants));
    navigate("/narrow-by-category");
  }

  return (
    <div>
      <PriceInput onValueChange={setPrice} DEFAULT_PRICE={DEFAULT_PRICE} />
      <div>
        <button onClick={handleClick} type="submit">
          Next step
        </button>
      </div>
    </div>
  );
}
