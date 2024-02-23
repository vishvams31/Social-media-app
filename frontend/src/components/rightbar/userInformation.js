import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './userInformation.css'
import { useNavigate } from 'react-router-dom';
const UserInformation = ({ user }) => {
  const { user: currentUser } = useContext(AuthContext)
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    city: user.city,
    from: user.from,
    relationship: user.relationship,
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
      // Redirect to login page
      navigate('/login');
      window.location.reload()
    }
  };

  const data = {
    city: formValues.city,
    from: formValues.from,
    relationship: formValues.relationship,
    userId: user._id
  };
  const updateData = async () => await axios.put("http://localhost:8800/api/users/" + user._id, data)

  const toggleEditMode = (e) => {
    e.preventDefault()
    if (isEditing && user._id == currentUser._id) {
      updateData();
    }
    setIsEditing(!isEditing);
  };
  // console.log(user)
  const followingcount = user.followings.length
  // user != null ? user.followers.length : ""
  const followercount = user.followers.length
  // user.followers.length
  const navigate = useNavigate()

  return (
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
        {isEditing ? <input
          type="text"
          name="city"
          value={formValues.city}
          onChange={handleInputChange}
          disabled={!isEditing}
          className='userInformationInput'
        /> : <span className='userInformationInput'>{formValues.city}</span>
        }
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From:</span>
        {isEditing ? <input
          type="text"
          name="from"
          value={formValues.from}
          onChange={handleInputChange}
          disabled={!isEditing}
          className='userInformationInput'
        /> : <span className='userInformationInput'>{formValues.from}</span>
        }
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        {isEditing ? <select
          name="relationship"
          value={formValues.relationship}
          onChange={handleInputChange}
          disabled={!isEditing}
        >
          <option value="">Select</option>
          <option value="1">Single</option>
          <option value="2">Married</option>
        </select> : <span className='userInformationInput'>{formValues.relationship == "1" ? "Single" : "Married"}</span>}
      </div>
      <div className="rightbarInfoItem">
        <div className="rightbarInfoKey">Followers:{followercount}</div>
      </div>
      <div className="rightbarInfoItem">
        <div className="rightbarInfoKey">Followings: {followingcount}</div>
      </div>

      {user._id === currentUser._id && (
        <div className='profileButtons'>
          <button className='saveButton' onClick={toggleEditMode}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button className='logoutButton' onClick={handleLogout}
          >Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserInformation;