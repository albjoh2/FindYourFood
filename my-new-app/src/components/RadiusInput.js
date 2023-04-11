import React, { useState } from "react";

function getCircleRadius(value) {
  return value / 385 + 33;
}

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
      <p className="description-text" style={{ marginBottom: "10px" }}>
        You're not looking to go too far, right? How about we keep it within{" "}
        <b>{value / 1000}</b> kilometers?
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          style={{ position: "absolute", transform: "translateX(65%)" }}
          type="range"
          name="radius"
          min="400"
          max="40000"
          step="100"
          value={value}
          onChange={handleChange}
        />
        <div className="house">🏠</div>
        <svg height={280} width={280}>
          <circle
            cx="140"
            cy="140"
            stroke="#eee"
            strokeWidth={2}
            fillOpacity={0}
            r={getCircleRadius(value)}
          />
        </svg>
      </div>
    </div>
  );
}
