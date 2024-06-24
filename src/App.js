import React, { useState, useEffect } from 'react';
import './App.css';
import en from './Enchanted.png';
import AuthenticationPopup from './AuthenticationPopup';
import StoryForm from './StoryForm';
import StoryCard from './StoryCard';
import footerImg from './footer.png';
function App() {
  const [showNewDiv, setShowNewDiv] = useState(false);
  const [showMainDiv, setShowMainDiv] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/stories');
        const data = await response.json();
        setStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      }
    };

    fetchStories();
  }, []);

  const handleButtonClick = () => {
    setShowMainDiv(false);
    setShowNewDiv(true);
  };

  const handleAuthButtonClick = () => {
    setShowAuthPopup(true);
  };

  const handleCardImageClick = (story) => {
    setSelectedStory(story);
    setShowMainDiv(false);
    setShowNewDiv(false);
  };

  const handleBackButtonClick = () => {
    setSelectedStory(null);
    setShowMainDiv(false);
    setShowNewDiv(true);
  };

  return (
    <div>
      {showMainDiv && !selectedStory && (
        <div className="App" id="main">
          <div className="responsive-div">
            <div className="image-container">
              <img src={en} alt="Card" />
            </div>
            <button type="button" onClick={handleButtonClick}>
              Discover Magic at Enchanted Tale <span className="arrow">→</span>
            </button>
          </div>
        </div>
      )}
      {showNewDiv && !selectedStory && (
        <div className="new-div" id="newdiv">
          <div className="wel">
            <img src={en} alt="Card" className="img" />
          </div>
          <button
            type="button"
            onClick={handleAuthButtonClick}
            style={{
              backgroundColor: "white",
              position: "absolute",
              borderRadius: "80px",
              left: "1510px",
              bottom: "0px",
              height: "30px",
              width: "30px",
            }}
          >
            !
          </button>
          <div id="cards">
            {showAuthPopup && <AuthenticationPopup setAuthenticated={setAuthenticated} setShowAuthPopup={setShowAuthPopup} />}
            {authenticated && <StoryForm />}
            <div className="heading-container">
              <h1 className="heading">
                𝕰𝖝𝖕𝖊𝖗𝖎𝖊𝖓𝖈𝖊 𝖙𝖍𝖊 𝕸𝖆𝖌𝖎𝖈 𝖔𝖋 𝕯𝖎𝖘𝖓𝖊𝖞 𝕱𝖆𝖎𝖗𝖞 𝕿𝖆𝖑𝖊𝖘
              </h1>
              <p className="description">
                𝔉𝔯𝔬𝔪 𝔱𝔥𝔢 𝔠𝔩𝔞𝔰𝔰𝔦𝔠 𝔞𝔡𝔳𝔢𝔫𝔱𝔲𝔯𝔢𝔰 𝔬𝔣 ℭ𝔦𝔫𝔡𝔢𝔯𝔢𝔩𝔩𝔞, 𝔖𝔫𝔬𝔴 𝔚𝔥𝔦𝔱𝔢, 𝔞𝔫𝔡 𝔖𝔩𝔢𝔢𝔭𝔦𝔫𝔤 𝔅𝔢𝔞𝔲𝔱𝔶 𝔱𝔬 𝔱𝔥𝔢
                𝔪𝔬𝔡𝔢𝔯𝔫-𝔡𝔞𝔶 𝔪𝔞𝔯𝔳𝔢𝔩𝔰 𝔬𝔣 𝔉𝔯𝔬𝔷𝔢𝔫, 𝔗𝔞𝔫𝔤𝔩𝔢𝔡, 𝔞𝔫𝔡 𝔐𝔬𝔞𝔫𝔞, 𝔈𝔫𝔠𝔥𝔞𝔫𝔱𝔢𝔡 𝔗𝔞𝔩𝔢𝔰 𝔣𝔢𝔞𝔱𝔲𝔯𝔢𝔰 𝔞 𝔯𝔦𝔠𝔥 𝔠𝔬𝔩𝔩𝔢𝔠𝔱𝔦𝔬𝔫 𝔬𝔣 𝔇𝔦𝔰𝔫𝔢𝔶 𝔣𝔞𝔦𝔯𝔶 𝔱𝔞𝔩𝔢 𝔰𝔱𝔬𝔯𝔦𝔢𝔰.
                𝔈𝔞𝔠𝔥 𝔱𝔞𝔩𝔢 𝔦𝔰 𝔟𝔢𝔞𝔲𝔱𝔦𝔣𝔲𝔩𝔩𝔶 𝔯𝔢𝔱𝔬𝔩𝔡 𝔴𝔦𝔱𝔥 𝔰𝔱𝔲𝔫𝔫𝔦𝔫𝔤 𝔦𝔩𝔩𝔲𝔰𝔱𝔯𝔞𝔱𝔦𝔬𝔫𝔰 𝔞𝔫𝔡 𝔢𝔫𝔤𝔞𝔤𝔦𝔫𝔤 𝔫𝔞𝔯𝔯𝔞𝔱𝔦𝔳𝔢𝔰 𝔱𝔥𝔞𝔱 𝔰𝔱𝔞𝔶 𝔱𝔯𝔲𝔢 𝔱𝔬 𝔱𝔥𝔢 𝔥𝔢𝔞𝔯𝔱 𝔬𝔣 𝔇𝔦𝔰𝔫𝔢𝔶’𝔰 𝔪𝔞𝔤𝔦𝔠𝔞𝔩 𝔰𝔱𝔬𝔯𝔶𝔱𝔢𝔩𝔩𝔦𝔫𝔤.
              </p>
            </div>
            <div className="story-cards-container">
              {stories.map((story) => (
                <div key={story._id} className="story-card" onClick={() => handleCardImageClick(story)}>
                  <StoryCard key={story._id} title={story.title} image={story.image} />
                </div>
              ))}
            </div>
          </div>

          <footer className='footer'>
           <p style={{textAlign:"center"}}>Enchanted Tales © 2024. All rights reserved</p>
           <p style={{textAlign:"center"}} >
                𝕰𝖝𝖕𝖊𝖗𝖎𝖊𝖓𝖈𝖊 𝖙𝖍𝖊 𝕸𝖆𝖌𝖎𝖈 𝖔𝖋 𝕯𝖎𝖘𝖓𝖊𝖞 𝕱𝖆𝖎𝖗𝖞 𝕿𝖆𝖑𝖊𝖘
              </p>
          </footer>
        </div>
        
      )}



      
      {selectedStory && (
        <div className="selectedstory">
          <h2 style={{ textAlign: "center", fontSize: "80px" }}>{selectedStory.title}</h2>
          <img className="selectedstory img"src={selectedStory.image} alt={selectedStory.title} />
          <p className='selectedstory p'>
            {selectedStory.story.split('\n').map((paragraph, index) => (
              <React.Fragment key={index}>
                {paragraph}
                <br />
              </React.Fragment>
              
            ))}
            <button  style={{
              backgroundColor: "blue",
              position: "absolute",
              borderRadius: "80px",
              left: "1300px",
              bottom: "0px",
              height: "30px",
              width: "200px",
            }}onClick={handleBackButtonClick}>Back</button>

          </p>
        </div>
      )}
    </div>
  );
}

export default App;
