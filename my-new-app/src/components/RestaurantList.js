export default function RestaurantList({ restaurants }) {
  return (
    <ul>
      {restaurants.map((restaurant) => (
        <li key={restaurant.id}>{restaurant.name}</li>
      ))}
    </ul>
  );
}
