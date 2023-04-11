import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/narrow-by-location");
  };

  return (
    <div>
      <div>
        <p className="description-text">
          Hungry? Let me find your perfect restaurant, anywhere, any cuisine!
        </p>
      </div>
      <button onClick={handleClick}>Yes!</button>
    </div>
  );
}
