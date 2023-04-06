import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetRestaurants } from "../reducer";

export default function Results() {
  const navigate = useNavigate();
  const restaurants = useSelector((state) => state.restaurants);
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(resetRestaurants());
    navigate("/");
  }

  let restaurantDisplay;

  if (restaurants && restaurants.length > 0) {
    const randomRestaurant =
      restaurants[Math.floor(Math.random() * restaurants.length)];

    restaurantDisplay = (
      <>
        <p>Okey, i got the perfect match for you. Here it is:</p>
        <h2>{randomRestaurant.name}</h2>
        <img
          className="restaurantImage"
          src={randomRestaurant.image_url}
          alt={randomRestaurant.name}
        />
        <p>{randomRestaurant.location.address1}</p>
        <p>{randomRestaurant.location.city}</p>
        <button onClick={handleClick} type="submit">
          Try again
        </button>
      </>
    );
  } else {
    restaurantDisplay = (
      <>
        <p>
          No restaurant matched your requirements, please try again. Protip:
          Make the searcharea bigger.
        </p>
        <button onClick={handleClick} type="submit">
          Try again
        </button>
      </>
    );
  }

  return (
    <div>
      <div>{restaurantDisplay}</div>
    </div>
  );
}
