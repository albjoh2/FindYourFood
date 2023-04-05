import { useNavigate } from "react-router-dom";

export default function NarrowByCategoryPage({ SERVER_URL }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/results");
  }

  return (
    <div>
      <div>
        <p>Pick some keywords that makes your stomach go brrr.</p>
        <button onClick={handleClick} type="submit">
          Find me the perfect restaurant
        </button>
      </div>
    </div>
  );
}
