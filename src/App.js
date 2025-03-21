import React, { Fragment, useState, useEffect } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    { thumb: image1, image: image1 },
    { thumb: image2, image: image2 },
    { thumb: image3, image: image3 },
    { thumb: image4, image: image4 }
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSlideShowActive, setIsSlideShowActive] = useState(false);
  const slideDuration = 1000; // 3 seconds per slide

  // Function to move to the next image
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % catalogs.length);
  };

  // Function to move to the previous image
  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? catalogs.length - 1 : prevIndex - 1
    );
  };

  // Function to select an image when clicking on a thumbnail
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  // Slideshow Effect
  useEffect(() => {
    let timer;
    
    if (isSlideShowActive) {
      timer = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % catalogs.length);
      }, slideDuration);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer); // Cleanup interval
  }, [isSlideShowActive, catalogs.length]);

  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className='layout-row justify-content-center align-items-center mt-20'>
              <button 
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={handlePrev}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              
              <Thumbs 
                items={catalogs} 
                currentIndex={activeIndex} 
                onThumbnailClick={handleThumbnailClick} 
              />
              
              <button 
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={handleNext}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>

        {/* Slideshow Checkbox */}
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            checked={isSlideShowActive} 
            onChange={() => setIsSlideShowActive(!isSlideShowActive)}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App;
