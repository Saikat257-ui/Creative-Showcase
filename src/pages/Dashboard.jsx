import React, { useState, useEffect } from 'react';
import MasonryGrid from '../components/MasonryGrid.jsx';
import { addImageForCurrentUser, getCurrentUser, getImagesForUser, deleteImageForUser, clearCurrentUser } from '../utils/storage.js';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (user) {
      setImages(getImagesForUser(user.username));
    }
  }, [user]);

  const handleFileChange = e => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  const handleUpload = e => {
    e.preventDefault();
    if (!file) return;
    addImageForCurrentUser(preview);
    setImages(prev => [...prev, preview]);
    setPreview(null);
    setFile(null);
  };

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/');
  };

  const handleDelete = idx => {
    if (!user) return;
    deleteImageForUser(user.username, idx);
    setImages(getImagesForUser(user.username));
  };

  return (
    <div className="container" style={{ marginTop: "4.5rem" }}>
      <div className='identity'>
        <h2>{user?.username}'s Dashboard</h2>
        <button onClick={handleLogout} style={{ marginBottom: '1rem' }}>Logout</button>
      </div>
      <form onSubmit={handleUpload} className="upload-box">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {preview && (
          <div style={{ marginTop: '1rem' }}>
            <img src={preview} alt="preview" style={{ maxWidth: '200px', borderRadius: '8px' }} />
            <br />
            <button type="submit" style={{ marginTop: '0.5rem' }}>Upload Image</button>
          </div>
        )}
      </form>
      <div className="gallery-container">
        {images.length ? (
          <MasonryGrid images={images} onDelete={handleDelete} />
        ) : (
          <p className="empty-state">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
