// StoryCard.js
import React from 'react';
import './App.css'; // Create CSS for card styling

function StoryCard({ title, image, story }) {
  return (
    <div className="story-card">
      <img src={image} alt={title} className="story-image" />
      <div className="story-content">
        <h3>{title}</h3>
        <p>{story}</p>
      </div>
    </div>
  );
}

export default StoryCard;
