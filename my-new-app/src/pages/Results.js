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
    const sortedRestaurants = [...restaurants].sort(
      (a, b) => b.rating - a.rating
    );
    restaurantId = sortedRestaurants[0].id;
  }

  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [reviews, setReviews] = useState(null);
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
      console.log(data);
    };

    Promise.all([fetchRestaurantDetails(), fetchReviews()]) // Use Promise.all to wait for both fetch calls to complete
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, [restaurantId, SERVER_URL]);

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
          <span style={{ marginBottom: "10px" }}>
            Here's your perfect match
          </span>

          <div className="restaurantCard">
            <img
              className="restaurantImage"
              src={restaurants[0].image_url}
              alt={restaurants[0].name}
            />
            <div className="card-title">
              <h2>{restaurants[0].name}</h2>
              <p>{restaurants[0].categories[0].title}</p>
            </div>
            {restaurantDetails && (
              <div className="card-footer">
                <div className="footer-child">
                  <h3>Price:</h3>
                  <p>{restaurantDetails.price}</p>
                </div>
                <div className="footer-child">
                  <h3>Rating:</h3>
                  <p>{restaurantDetails.rating}/5</p>
                </div>
              </div>
            )}
            <div className="card-footer">
              {reviews.reviews.length !== 0 && (
                <div className="footer-child">
                  <>
                    <h3>Random review:</h3>
                    {reviews.reviews.map((review) => (
                      <>
                        <div className="quote" key={review.id}>
                          <p>"{review.text}"</p>
                        </div>
                      </>
                    ))}
                  </>
                </div>
              )}
              <div className="footer-child">
                <h3>Address:</h3>
                <address>{restaurants[0].location.address1}</address>
                <address>
                  {restaurants[0].location.zip_code}{" "}
                  {restaurants[0].location.city}
                </address>
                {restaurantDetails && restaurantDetails.display_phone && (
                  <>
                    <h3>Contact:</h3>
                    <address>{restaurantDetails.display_phone}</address>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div>
          <p className="description-text" style={{ marginBottom: "10px" }}>
            No restaurant matched your requirements, please try again.{" "}
          </p>
          <p>Protip: Make the search area bigger.</p>
        </div>
      )}
      <button onClick={handleClick} type="submit">
        Try again
      </button>
    </div>
  );
}
