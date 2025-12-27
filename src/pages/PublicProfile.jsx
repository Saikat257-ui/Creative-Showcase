import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MasonryGrid from "../components/MasonryGrid.jsx";
import {
  getImagesForUser,
  getCurrentUser,
  deleteImageForUser,
} from "../utils/storage.js";

function PublicProfile() {
  const { username } = useParams();
  const [images, setImages] = useState([]);

  useEffect(() => {
    const imgs = getImagesForUser(username);
    setImages(imgs);
  }, [username]);

  const current = getCurrentUser();
  const canDelete = current && current.username === username;

  const handleDelete = (idx) => {
    deleteImageForUser(username, idx);
    setImages(getImagesForUser(username));
  };

  return (
    <div className="container" style={{ marginTop: "4.5rem" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2.5rem",
          textDecoration: "underline",
        }}
      >
        {username}'s Public Profile
      </h2>
      <div className="gallery-container">
        {images.length ? (
          <MasonryGrid
            images={images}
            onDelete={canDelete ? handleDelete : undefined}
          />
        ) : (
          <p className="empty-state">No images uploaded yet.</p>
        )}
      </div>
    </div>
  );
}

export default PublicProfile;
