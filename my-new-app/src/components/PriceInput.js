import React, { useState } from "react";

export default function PriceInput({ onValueChange, DEFAULT_PRICE }) {
  const [value, setValue] = useState(Number(DEFAULT_PRICE));

  function handleChange(event) {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onValueChange(newValue); // pass the value to the onValueChange prop
  }

  function getFancyLevelText(value) {
    switch (value) {
      case 1:
        return "Comfie, please!";
      case 2:
        return "Casual, please!";
      case 3:
        return "Fancy, please!";
      case 4:
        return "Fine dining, please!";
      default:
        return "";
    }
  }

  return (
    <div>
      <span style={{ marginBottom: "10px" }}>
        On a scale of McDonald's to Michelin star, how fancy do you want to go?{" "}
        <p>
          <b>{getFancyLevelText(value)}</b>
        </p>
      </span>
      <div>
        <input
          type="range"
          name="radius"
          min="1"
          max="4"
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
