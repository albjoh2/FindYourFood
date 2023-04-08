import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/narrow-by-location");
  };

  return (
    <div>
      <p>Hungry? Let me find your perfect restaurant, anywhere, any cuisine!</p>
      <button onClick={handleClick}>Yes!</button>
    </div>
  );
}
