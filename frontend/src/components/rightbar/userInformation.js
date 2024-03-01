import React, { useState, useRef } from 'react';
import './userInformation.css'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form'
import { updateData, handleFileChange } from '../../services/Service'
const UserInformation = ({ user }) => {
  const currentUser = useSelector(state => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    city: user.city,
    state: user.state,
    relationship: user.relationship,
    username: user.username,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // Clear user session
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      // Redirect to login page
      navigate('/login');
      window.location.reload()
    }
  };
  const toggleEditMode = async (data, e) => {
    e.preventDefault()
    if (isEditing && user._id === currentUser._id) {
      await updateData(data, user);
      // window.location.reload()
    }
    setIsEditing(!isEditing);
  };
  // console.log(user)
  const followingcount = user.followings.length
  // user != null ? user.followers.length : ""
  const followercount = user.followers.length
  // user.followers.length
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm();
  const fileInputRef = useRef(null);
  const handleProfilePictureClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChangeWrapper = (event) => {
    handleFileChange(event, user);

  };
  const showUpdateButton = user.username === currentUser.username;
  return (
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <div className="rightbarInfoItem">
          <span className="rightbarInfoKey">Username:</span>
          {isEditing ? <input
            {...register("username")}
            type="text"
            value={formValues.username}
            onChange={handleInputChange}
            disabled={!isEditing}
            className='userInformationInput'
          /> : <span className='userInformationInput'>{formValues.username}</span>
          }
        </div>
        <span className="rightbarInfoKey">City:</span>
        {isEditing ? <input
          {...register("city")}
          type="text"
          value={formValues.city}
          onChange={handleInputChange}
          disabled={!isEditing}
          className='userInformationInput'
        /> : <span className='userInformationInput'>{formValues.city}</span>
        }
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">State:</span>
        {isEditing ? <input
          {...register("state")}
          type="text"
          value={formValues.state}
          onChange={handleInputChange}
          disabled={!isEditing}
          className='userInformationInput'
        /> : <span className='userInformationInput'>{formValues.state}</span>
        }
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        {isEditing ? <select
          {...register("relationship")}
          value={formValues.relationship}
          onChange={handleInputChange}
          disabled={!isEditing}
        >
          <option value="">Select</option>
          <option value="1">Single</option>
          <option value="2">Married</option>
        </select> : <span className='userInformationInput'>{formValues.relationship === "1" ? "Single" : "Married"}</span>}
      </div>
      <div className="rightbarInfoItem">
        <div className="rightbarInfoKey">Followers:{followercount}</div>
      </div>
      <div className="rightbarInfoItem">
        <div className="rightbarInfoKey">Followings: {followingcount}</div>
      </div>

      {user._id === currentUser._id && (
        <div className='profileButtons'>
          <button className='saveButton' onClick={handleSubmit(toggleEditMode)}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button className='logoutButton' onClick={handleLogout}
          >Logout</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChangeWrapper}
            id="file"
            accept=".png,.jpeg,.jpg"
          />
          {showUpdateButton && (
            <button className="updateProfilePictureButton" onClick={handleProfilePictureClick}>Update Profile Picture</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInformation;