import { useNavigate } from "react-router-dom";

export default function Results({ SERVER_URL }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/narrow-by-location");
  }

  return (
    <div>
      <div>
        <p>Okey, i got the perfect match for you. Here it is:</p>
        <button onClick={handleClick} type="submit">
          Try again
        </button>
      </div>
    </div>
  );
}
