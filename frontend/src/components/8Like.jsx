import React, { useState } from "react"; // Import useState for local state

const LikeButton = ({ likeCount, onLike }) => {
  const [liked, setLiked] = useState(false); // State to track if liked

  const handleLikeClick = () => {
    setLiked(true); // Set liked state to true
    onLike(); // Call the onLike function passed from parent
    setTimeout(() => {
      setLiked(false); // Reset liked state after animation
    }, 1000); // Duration of the animation
  };

  return (
    <div className="like-button">
      <button onClick={handleLikeClick} className="like-icon">
        <img
          src="./images/likeIcon.png"
          className={`likeIcon ${liked ? "liked" : ""}`}
        />
      </button>
      {likeCount > 0 && <span className="like-count">{likeCount}</span>}
      {liked && <div className="like-popup">Liked!</div>} {/* Popup effect */}
    </div>
  );
};

export default LikeButton;
