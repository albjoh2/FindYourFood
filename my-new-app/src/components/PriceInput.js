import React, { useState } from "react";

export default function PriceInput({ onValueChange, DEFAULT_PRICE }) {
  const [value, setValue] = useState(DEFAULT_PRICE);

  function handleChange(event) {
    const newValue = event.target.value;
    setValue(newValue);
    onValueChange(newValue); // pass the value to the onValueChange prop
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <span style={{ marginBottom: "10px" }}>
        On a scale of McDonald's to Michelin star, how fancy do you want to go?{" "}
        <p>
          <b>
            {value === "1" || value === 1
              ? "Comfie, please!"
              : value === "2" || value === 2
              ? "Casual, please!"
              : value === "3" || value === 3
              ? "Fancy, please!"
              : "Fine dining, please!"}
          </b>
        </p>
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
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
