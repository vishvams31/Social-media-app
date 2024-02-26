import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import ImageUploadModal from '../profile/ImageUploadModel'// Adjust the path as necessary



export default function Profile() {
    const navigate = useNavigate();
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({});
    const username = useParams().username;
    const [showModal, setShowModal] = useState(false);

    const handleUpdateImages = (newImages) => {
        // Here, you would typically update the user's state or perform any other necessary actions
        // For example, updating the user's profile and cover images in the state
        console.log('Images updated:', newImages);
        // You might also want to close the modal after updating
        setShowModal(false);
    };

    useEffect(() => {
        fetchUser();
    }, [username]);

    const fetchUser = async () => {
        setIsLoading(true)
        const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
        setUser(res.data);
        setIsLoading(false)
    };


    const MemorizeComp = useMemo(() => {
        return (
            Object.keys(user).length > 0 && <div className="profileRightBottom">
                <Feed username={username} />
                <Rightbar user={user} />
            </div>
        )
    }, [user])
    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src={
                                    user.coverPicture
                                        ? PF + user.coverPicture
                                        : PF + "person/noCoverPicture.jpeg"
                                }
                                alt=""
                            />
                            {/* <input
                                type="file"
                                accept="image/*"
                                // onChange={handleCoverImageChange}
                                id="coverImageInput"
                            /> */}
                            {/* <label htmlFor="coverImageInput" className="upload-button">Upload Cover Image</label> */}
                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/noProfilePicture.jpeg"
                                }
                                alt=""
                            />
                            {/* <button onClick={() => setShowModal(true)}>Update Profile and Cover Image</button> */}
                            {/* <input
                                type="file"
                                accept="image/*"
                                // onChange={handleProfileImageChange}
                                id="profileImageInput"
                            /> */}
                            {/* <label htmlFor="profileImageInput" className="upload-button profileUserImg-upload-button">Upload Profile Image</label> */}
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    {MemorizeComp}
                </div>
            </div>
            {/* {showModal && (
                <ImageUploadModal
                    userId={user._id}
                    onClose={() => setShowModal(false)}
                    onUpdate={handleUpdateImages}
                />
            )} */}
        </>
    );

}