import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/narrow-by-location");
  };

  return (
    <div>
      <p>
        I'll do my very best to find you the perfect restaurant, wherever you
        are and whatever you want to eat.
      </p>
      <button onClick={handleClick}>Find me the perfect restaurant</button>
    </div>
  );
}
