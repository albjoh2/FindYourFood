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
        How fine do you want to dine: {value} dollars
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
