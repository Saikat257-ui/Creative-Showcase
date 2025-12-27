import React, { useEffect, useState } from 'react';
import { getAllImages } from '../utils/storage.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import { Link } from 'react-router-dom';

function Landing() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const all = getAllImages();
    const shuffled = all.sort(() => 0.5 - Math.random()).slice(0, 20);
    setImages(shuffled);
  }, []);

  return (
    <div className="container">
      <div className="hero">
        <h1>Showcase Your Creative Moments</h1>
        <p>Upload, organize, and share your artwork in a calm, elegant gallery.</p>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/login">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
      <div className="gallery-container">
        {images.length ? (
          <MasonryGrid images={images} />
        ) : (
          <p className="empty-state">No images to display yet.</p>
        )}
      </div>
    </div>
  );
}

export default Landing;
