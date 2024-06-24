import React, { useState } from 'react';

function StoryForm() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [story, setStory] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    // Prepare the data to be sent to the backend
    const formData = {
      title: title,
      image: image,
      story: story
    };

    try {
      // Send a POST request to your backend API endpoint
      const response = await fetch('/add-story', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Form data submitted successfully');
        // Optionally, close the form after successful submission
        setIsOpen(false);
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null; // Render nothing if the form is closed
  }

  return (
    <div className='authentication-popup'>
      <form className="story-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />
        <textarea placeholder="Story" value={story} onChange={(e) => setStory(e.target.value)}></textarea>
        <button type="submit" style={{ position: "absolute", left: "60px", top: "260px", height: "50px" }}>Submit</button>
      </form>
      <button className="close-button" onClick={handleClose} style={{ color: "white", backgroundColor: "blue", left: "360px", top: "260px", height: "50px", borderRadius: "50px", width: "10px" }}>X</button>
    </div>
  );
}

export default StoryForm;
