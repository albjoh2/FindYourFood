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

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategories((categories) =>
      categories.includes(category)
        ? categories.filter((c) => c !== category)
        : [...categories, category]
    );
  };

  const handleClick = () => {
    const filteredRestaurants = restaurants.filter((restaurant) =>
      selectedCategories.some(
        (category) => restaurant.categories[0].title === category
      )
    );
    dispatch(setRestaurants(filteredRestaurants));
    navigate("/results");
  };

  return (
    <div>
      <div>
        <p>Pick some keywords that makes your stomach go brrr.</p>
        {categories.map((category) => (
          <label key={category}>
            <input
              type="checkbox"
              value={category}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category)}
            />
            {category}
          </label>
        ))}
        <button onClick={handleClick} type="submit">
          Find me the perfect restaurant
        </button>
      </div>
    </div>
  );
}
