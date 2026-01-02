import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageModal from './ImageModal';
import './MasonryGrid.css';

function MasonryGrid({ images, onDelete, disableModal = false }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (src) => {
    if (!disableModal) {
      setSelectedImage(src);
    }
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div className="masonry-grid">
        {images.map((item, idx) => {
          // support either simple string sources or objects { src, username }
          const src = typeof item === 'string' ? item : item?.src;
          const username = typeof item === 'object' ? item?.username : undefined;
          const alt = username ? `${username}-image-${idx}` : `image-${idx}`;

          return (
            <div className="masonry-item" key={idx}>
              <div className="img-wrap">
                <img 
                  src={src} 
                  alt={alt} 
                  style={{ 
                    width: '100%', 
                    display: 'block', 
                    cursor: disableModal ? 'default' : 'pointer' 
                  }} 
                  onClick={() => handleImageClick(src)}
                />
                {onDelete && (
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(idx);
                    }}
                    title="Delete image"
                    aria-label={`Delete image ${idx}`}
                  >
                    ×
                  </button>
                )}
                {username && (
                  <div className="img-author">
                    <Link to={`/profile/${username}`}>@{username}</Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ImageModal 
        isOpen={!!selectedImage} 
        onClose={handleCloseModal} 
        imageSrc={selectedImage} 
      />
    </>
  );
}

export default MasonryGrid;
