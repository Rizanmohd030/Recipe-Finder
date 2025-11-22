import React, { useRef } from "react";

export default function CameraCapture({ onCapture }) {
  const inputRef = useRef(null);

  const handleSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => onCapture(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <button onClick={() => inputRef.current.click()}>
        Upload / Take Photo
      </button>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        ref={inputRef}
        onChange={handleSelect}
        style={{ display: "none" }}
      />
    </div>
  );
}
