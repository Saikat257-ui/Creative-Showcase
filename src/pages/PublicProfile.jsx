import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasonryGrid from "../components/MasonryGrid.jsx";
import {
  getImagesForUser,
  getCurrentUser,
  deleteImageForUser,
  getUserBio,
  updateUserBio,
} from "../utils/storage.js";

function PublicProfile() {
  const { username } = useParams();
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("gallery");
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState('');

  useEffect(() => {
    const imgs = getImagesForUser(username);
    setImages(imgs);
    const userBio = getUserBio(username);
    setBio(userBio);
    setEditBio(userBio);
  }, [username]);

  const current = getCurrentUser();
  const canDelete = current && current.username === username;

  const handleDelete = (idx) => {
    deleteImageForUser(username, idx);
    setImages(getImagesForUser(username));
  };

  const handleSaveBio = () => {
    if (editBio.length <= 200) {
      updateUserBio(username, editBio);
      setBio(editBio);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditBio(bio);
    setIsEditing(false);
  };

  return (
    <div className="container public-profile-page">
      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <img
            src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${username}`}
            alt={username}
            className="profile-avatar"
          />

          <div className="profile-meta">
            <h2 className="profile-name">{username}</h2>
            <p className="profile-handle">@{username}</p>
            {bio ? <p className="profile-bio">{bio}</p> : canDelete && <p className="profile-bio">Creative soul sharing visual stories</p>}
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          <button
            className={activeTab === "gallery" ? "active" : ""}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About {username}
          </button>
        </div>

        {/* Content */}
        <div className="profile-content">
          {activeTab === "gallery" && (
            <div className="inset-frame">
              {images.length ? (
                <MasonryGrid
                  images={images}
                  onDelete={canDelete ? handleDelete : undefined}
                />
              ) : (
                <div className="profile-empty-state">
                  <p>No images uploaded yet.</p>
                  <span>
                    Stay tuned as {username} adds new art here!
                  </span>
                </div>
              )}
            </div>
          )}

          {activeTab === "about" && (
            <div className="about-section">
              {canDelete ? (
                <div className="bio-edit-section">
                  {!isEditing ? (
                    <div>
                      <div className="bio-display">
                        {bio || 'Tell others about yourself...'}
                      </div>
                      <button 
                        className="edit-bio-btn" 
                        onClick={() => setIsEditing(true)}
                      >
                        Edit Bio
                      </button>
                    </div>
                  ) : (
                    <div className="bio-edit-form">
                      <textarea
                        value={editBio}
                        onChange={(e) => setEditBio(e.target.value)}
                        placeholder="Tell others about yourself..."
                        maxLength={200}
                        rows={4}
                        className="bio-textarea"
                      />
                      <div className="bio-actions">
                        <span className="char-count">{editBio.length}/200</span>
                        <div>
                          <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
                          <button onClick={handleSaveBio} className="save-btn">Save</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bio-display">
                  {bio || `${username} hasn't shared anything about themselves yet.`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
