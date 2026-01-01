import React, { useState, useEffect } from 'react';
import MasonryGrid from '../components/MasonryGrid.jsx';
import { addImageForCurrentUser, getCurrentUser, getImagesForUser, deleteImageForUser, clearCurrentUser } from '../utils/storage.js';
import { useNavigate } from 'react-router-dom';
import { Upload } from 'lucide-react';


function Dashboard() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [images, setImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (user) {
      setImages(getImagesForUser(user.username));
    }
  }, [user]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/');
  };

  const processFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      addImageForCurrentUser(result);
      setImages(getImagesForUser(user.username));
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const openFileDialog = () => {
    document.getElementById('file-upload').click();
  };

  const handleDelete = (index) => {
     // confirm delete?
     deleteImageForUser(user?.username, index);
     setImages(getImagesForUser(user?.username));
  };
  
  if (!user) return null; // or loading

  // Mock data for sidebars
  const lastAdded = images.slice(-3).reverse(); 

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome Back, <span>{user.username}!</span></h1>
        <button className="dashboard-btn-primary" onClick={handleLogout}>Log out</button>
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="dashboard-main">
          {/* Upload Section */}
          <div className="section-card">
             <h2 className="section-title">Your Uploads</h2>
             <form 
               className="upload-area" 
               onDragEnter={handleDrag} 
               onDragLeave={handleDrag} 
               onDragOver={handleDrag} 
               onDrop={handleDrop}
               style={{ borderColor: dragActive ? '#5c6bc0' : '#dce0e9', backgroundColor: dragActive ? '#f0f2fa' : '#fcfcfc' }}
             >
                <input 
                  type="file" 
                  id="file-upload" 
                  accept="image/*" 
                  multiple={false} 
                  onChange={handleChange} 
                  style={{ display: 'none' }} 
                />
                <div className="upload-icon">
                  <Upload strokeWidth={1} size={48} />
                </div>
                <p className="upload-text">
                  Drag & drop your images here, or <span onClick={openFileDialog}>browse</span>
                </p>
                <button type="button" className="dashboard-btn-primary" onClick={openFileDialog}>
                  Upload Image
                </button>
             </form>
          </div>

          {/* Gallery Section */}
          {/* Gallery Section */}
          <div className="section-card gallery-card">
            <h2 className="section-title">Gallery</h2>
            <div className="gallery-container">
               {images.length > 0 ? (
                 <MasonryGrid images={images} onDelete={handleDelete} />
               ) : (
                 <p style={{color: '#999'}}>No images yet.</p>
               )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="dashboard-sidebar">
           <div className="section-card" style={{ height: 'fit-content' }}>
              <div className="sidebar-header">
                <h3>Last Added</h3>
                {/* <a href="#" className="sidebar-link">View All</a> */}
              </div>
              
              <div className="last-added-list">
                 {lastAdded.length > 0 ? lastAdded.map((img, idx) => (
                    <div key={idx} className="last-added-item">
                       <div className="last-added-thumb">
                          <img src={img.src} alt="thumb" />
                       </div>
                       <div className="last-added-info">
                          <span className="last-added-name">New Upload</span>
                          <span className="last-added-time">{new Date(img.uploadedAt).toLocaleString()}</span>
                       </div>
                    </div>
                 )) : (
                   <p style={{fontSize: '0.9rem', color: '#999'}}>No recent uploads</p>
                 )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
