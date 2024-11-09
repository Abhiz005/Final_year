import React, { useState } from "react";

const SearchIcon = () => {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`search-container ${expanded ? "expanded" : ""}`}>
      <input
        type="text"
        className="search-input"
        placeholder="Search for top colleges based on courses..."
      />
      <div className="search-icon" onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          className="icon"
        >
          <path d="M10 2a8 8 0 015.29 13.29l5.38 5.38-1.42 1.42-5.38-5.38A8 8 0 1110 2m0-2a10 10 0 100 20 10 10 0 100-20z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchIcon;
