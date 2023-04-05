import React, { useState } from "react";

export default function RadiusInput({ onValueChange, DEFAULT_RADIUS }) {
  const [value, setValue] = useState(DEFAULT_RADIUS);

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
      <span style={{ marginBottom: "10px" }}>Radius: {value} meters</span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          style={{ position: "absolute", transform: "translateX(50%)" }}
          type="range"
          name="radius"
          min="400"
          max="40000"
          step="100"
          value={value}
          onChange={handleChange}
        />
        <svg height={260} width={260}>
          <circle cx="130" cy="130" fill="#050515" r={value / 300} />
        </svg>
      </div>
    </div>
  );
}
