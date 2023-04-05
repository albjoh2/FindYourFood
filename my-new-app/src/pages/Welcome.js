import { useNavigate } from "react-router-dom";

export default function Welcome({ SERVER_URL }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/narrow-by-location");
  }

  return (
    <div>
      <div>
        <p>
          Ill do my very best to get you the restaurant you deserve, whereever
          you are and whatever you want to eat.
        </p>
        <button onClick={handleClick} type="submit">
          Find me the perfect restaurant
        </button>
      </div>
    </div>
  );
}
