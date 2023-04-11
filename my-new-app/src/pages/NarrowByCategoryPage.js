import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setRestaurants } from "../reducer";
import { useNavigate } from "react-router-dom";

export default function NarrowByCategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const restaurants = useSelector((state) => state.restaurants);

  const [selectedCategories, setSelectedCategories] = useState([]);

  const categories = Array.from(
    new Set(restaurants.flatMap((r) => r.categories[0].title))
  );

  //TODO - seems like some categorys are missing ex Josefs has both pub and scandinavian but only pub is shown
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((categories) =>
      categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category]
    );
  };

  const filterRestaurantsByCategory = (restaurants, selectedCategories) => {
    return restaurants.filter((restaurant) =>
      selectedCategories.some(
        (category) => restaurant.categories[0].title === category
      )
    );
  };

  const handleClick = () => {
    const filteredRestaurants = filterRestaurantsByCategory(
      restaurants,
      selectedCategories
    );
    dispatch(setRestaurants(filteredRestaurants));
    navigate("/results");
  };

  return (
    <div>
      <div>
        <p className="description-text">
          Pick some keywords that makes your stomach go brrr.
        </p>
        <div>
          <div className={"container"}>
            <ul className={"tag"}>
              {categories.map((category) => {
                if (category === "Restaurants") {
                  return null;
                }
                return (
                  <li key={category}>
                    <input
                      type="checkbox"
                      id={category}
                      value={category}
                      onChange={handleCategoryChange}
                      checked={selectedCategories.includes(category)}
                    />
                    <label htmlFor={category}>{category}</label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <button onClick={handleClick} type="submit">
          Find me the perfect restaurant
        </button>
      </div>
    </div>
  );
}
