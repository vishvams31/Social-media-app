// ImageUploadModal.js
import React from 'react';
import axios from 'axios';
import "./imageUploadModel.css"

const ImageUploadModal = ({ userId, onClose, onUpdate }) => {
    const [coverImage, setCoverImage] = React.useState(null);
    const [profileImage, setProfileImage] = React.useState(null);

    const handleCoverImageChange = (e) => {
        setCoverImage(e.target.files[0]);
    };

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    const handleUploadImages = async () => {
        const formData = new FormData();
        if (coverImage) formData.append('coverImage', coverImage);
        if (profileImage) formData.append('profileImage', profileImage);

        try {
            const res = await axios.put(`http://localhost:8800/api/users/${userId}/updateImages`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(res.data); // Update the user state with the new images
            onClose(); // Close the modal
        } catch (err) {
            console.error('Failed to upload images:', err);
        }
    };

    return (
        <div className="image-upload-modal">
            <div className="modal-content">
                <h2>Update Profile and Cover Images</h2>
                <input type="file" accept="image/*" onChange={handleCoverImageChange} />
                <input type="file" accept="image/*" onChange={handleProfileImageChange} />
                <button onClick={handleUploadImages}>Update Images</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ImageUploadModal;
