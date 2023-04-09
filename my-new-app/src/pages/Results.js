import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetRestaurants } from "../reducer";

export default function Results({ SERVER_URL }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);
  const hasRestaurants = Boolean(restaurants && restaurants.length);
  let restaurantId;

  if (hasRestaurants) {
    restaurantId = restaurants[0].id;
  }

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state variable

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const response = await fetch(`${SERVER_URL}/business/${restaurantId}`);
      const data = await response.json();
      setRestaurantDetails(data);
    };

    const fetchReviews = async () => {
      const response = await fetch(`${SERVER_URL}/reviews/${restaurantId}`);
      const data = await response.json();
      setReviews(data);
    };

    Promise.all([fetchRestaurantDetails(), fetchReviews()]) // Use Promise.all to wait for both fetch calls to complete
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, [SERVER_URL, restaurantId]);

  const handleClick = () => {
    dispatch(resetRestaurants());
    navigate("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {hasRestaurants ? (
        <>
          <p>Get ready to dig in... Here's your perfect match!</p>
          <div className="restaurantCard">
            <img
              className="restaurantImage"
              src={restaurants[0].image_url}
              alt={restaurants[0].name}
            />
            <h2>{restaurants[0].name}</h2>
            <h3>Style:</h3>
            <p>{restaurants[0].categories[0].title}</p>
            <h3>Address:</h3>
            <address>{restaurants[0].location.address1}</address>
            <address>{restaurants[0].location.zip_code}</address>
            <address>{restaurants[0].location.city}</address>
            {restaurantDetails && (
              <div className="card-footer">
                <div>
                  <h3>Price:</h3>
                  <p>{restaurantDetails.price}</p>
                </div>
                <div>
                  <h3>Rating:</h3>
                  <p>{restaurantDetails.rating}/5</p>
                </div>
              </div>
            )}
            {reviews.length > 0 && (
              <>
                <h3>Reviews:</h3>
                {reviews.map((review) => (
                  <div key={review.id}>
                    <p>{review.text}</p>
                    <p>By: {review.user.name}</p>
                    <p>Rating: {review.rating}</p>
                  </div>
                ))}
              </>
            )}
            {restaurantDetails && restaurantDetails.display_phone && (
              <>
                <h3>Contact:</h3>
                <address>{restaurantDetails.display_phone}</address>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <p>
            No restaurant matched your requirements, please try again. Protip:
            Make the searcharea bigger.
          </p>
        </>
      )}
      <button onClick={handleClick} type="submit">
        Try again
      </button>
    </div>
  );
}
