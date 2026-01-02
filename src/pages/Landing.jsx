import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllImages } from '../utils/storage';
import MasonryGrid from '../components/MasonryGrid';

const PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2011&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1788&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=1740&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1744&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1674&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1740&auto=format&fit=crop",
];

function Landing() {
  const [displayImages, setDisplayImages] = useState(PLACEHOLDERS);

  useEffect(() => {
    // Fetch user uploads
    const userUploads = getAllImages();
    if (userUploads && userUploads.length > 0) {
      // getAllImages returns { src, username }. 
      // We want to pass the whole object to MasonryGrid so it can link to the profile.
      const uploadedItems = userUploads.reverse(); // Show newest first
      
      // "But the previous unsplash images ... should get disappeared when images got uploade by the user"
      // So if we have ANY uploads, show ONLY uploads.
      setDisplayImages(uploadedItems);
    }
  }, []);

  return (
    <div className="container">
      <div className="hero">
        <h1>Showcase Your Creative Moments</h1>
        <p>Upload, organize, and share your artwork in a calm, elegant gallery.</p>
        <div style={{ marginTop: '2rem' }}>
          <Link to="/login">
            <button style={{ padding: '0.8rem 2.5rem', fontSize: '1.1rem' }}>Get Started</button>
          </Link>
          <p className="landing-subtitle">
            Sign up for free and start sharing your art
          </p>
        </div>
      </div>
      
      <div className="inset-frame">
        <MasonryGrid 
          images={displayImages} 
          disableModal={displayImages === PLACEHOLDERS}
        />
      </div>
    </div>
  );
}

export default Landing;
