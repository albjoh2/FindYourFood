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

  let formattedStart;
  let formattedEnd;

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      const response = await fetch(`${SERVER_URL}/business/${restaurantId}`);
      const data = await response.json();
      setRestaurantDetails(data);
      //TODO: get this to work, the openinghours are not showing
      formatHours();
    };

    const fetchReviews = async () => {
      const response = await fetch(`${SERVER_URL}/reviews/${restaurantId}`);
      const data = await response.json();
      setReviews(data);
    };

    Promise.all([fetchRestaurantDetails(), fetchReviews()]) // Use Promise.all to wait for both fetch calls to complete
      .then(() => setLoading(false))
      .catch((error) => console.error(error));
  }, [restaurantId, SERVER_URL]);

  const handleClick = () => {
    dispatch(resetRestaurants());
    navigate("/");
  };

  const formatHours = () => {
    if (
      !restaurantDetails ||
      !restaurantDetails.hours ||
      !restaurantDetails.hours[0]
    ) {
      return;
    }

    // Get the current day of the week (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();

    // Find the open object for today's day of the week
    // Get the opening hours for today
    const todayOpen = restaurantDetails.hours[0].open.find(
      (open) => open.day === today
    );

    // Format the opening hours with a colon
    formattedStart =
      todayOpen.start.substr(0, 2) + ":" + todayOpen.start.substr(2, 2);
    formattedEnd =
      todayOpen.end.substr(0, 2) + ":" + todayOpen.end.substr(2, 2);
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
              src={restaurantDetails.image_url}
              alt={restaurantDetails.name}
            />
            <div className="card-title">
              <h2>{restaurantDetails.name}</h2>
              <p>{restaurantDetails.categories[0].title}</p>
            </div>
            {restaurantDetails && (
              <div className="card-footer">
                <div className="footer-child">
                  <h3>Price</h3>
                  <p>{restaurantDetails.price}</p>
                </div>
                <div className="footer-child">
                  <h3>Rating</h3>
                  <p>{restaurantDetails.rating}/5</p>
                </div>
              </div>
            )}
            <div className="card-footer">
              {reviews.reviews.length !== 0 && (
                <div className="footer-child">
                  <>
                    <h3>Random review</h3>
                    <>
                      <div className="quote" key={reviews.reviews[0].id}>
                        <p>"{reviews.reviews[0].text}"</p>
                      </div>
                    </>
                  </>
                </div>
              )}
              <div className="footer-child">
                {formattedStart && (
                  <div>
                    <h3>Open today</h3>
                    <p>
                      {formattedStart} - {formattedEnd}
                    </p>
                  </div>
                )}
                <h3>Address</h3>
                <address>{restaurantDetails.location.address1}</address>
                <address>
                  {restaurantDetails.location.zip_code}{" "}
                  {restaurantDetails.location.city}
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
          <p>
            <b>Protip:</b> Make the search area bigger or change the fancyness.
          </p>
        </div>
      )}
      <button onClick={handleClick} type="submit">
        Try again
      </button>
    </div>
  );
}
