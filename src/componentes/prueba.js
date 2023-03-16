import React, { useState } from "react";

export function Prueba() {
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const toggleHover = (index) => {
    setHoveredIndex(index);
  };

  const myData = [
    { name: "Element 1" },
    { name: "Element 2" },
    { name: "Element 3" },
  ];

  return (
    <div>
      {myData.map((item, index) => (
        <div
          key={index}
          className={
            hoveredIndex === index
              ? "bg-white rounded shadow-sm py-5 px-4 card-hover"
              : "bg-white rounded shadow-sm py-5 px-4"
          }
          onMouseEnter={() => toggleHover(index)}
          onMouseLeave={() => toggleHover(-1)}
        >
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Prueba;
