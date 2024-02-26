import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UserInformation from "./userInformation";
import { useDispatch, useSelector } from "react-redux";

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    // const { user: currentUser, dispatch } = useContext(AuthContext)
    const currentUser = useSelector(state => state.auth.user)
    const dispatch = useDispatch();

    const [followed, setFollowed] = useState(false);
    useEffect(() => {
        setFollowed(currentUser.followings.includes(user?._id));
    }, [currentUser, user?._id]);
    // console.log(followed);
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const getFriends = async () => {
            try {
                setIsLoading(true); // Start loading
                if (user && user._id) {
                    const URL = `http://localhost:8800/api/users/friends/${user._id}`;
                    const friendList = await axios.get(URL);
                    setFriends(friendList.data);
                    setIsLoading(false); // Stop loading
                }

            } catch (err) {
                console.log("smit" + err);
            }
        };
        getFriends();
    }, [user]);
    const followHandler = async () => {
        try {
            console.log(!followed)
            if (followed) {
                await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "UNFOLLOW", payload: user._id });
            } else {
                await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
                    userId: currentUser._id,
                });
                dispatch({ type: "FOLLOW", payload: user._id });
            }
            setFollowed(!followed);
        } catch (err) {
        }
    };

    const HomeRightbar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/gift.png" alt="" />
                    <span className="birthdayText">
                        <b>Jeel Maheshwari</b> and <b>3 other friends</b> have a birhday today.
                    </span>
                </div>
                <img className="rightbarAd" src="assets/ad.png" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map((u) => (
                        <Online key={u.id} user={u} />
                    ))}
                </ul>
            </>
        );
    };

    const ProfileRightbar = () => {
        // const PF = process.env.REACT_APP_PUBLIC_FOLDER
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowButton" onClick={followHandler}>
                        {followed ? "Unfollow" : "follow"}
                        {followed ? <RemoveIcon /> : <AddIcon />}
                    </button>
                )}

                <h4 className="rightbarTitle">User information</h4>
                <UserInformation user={user} />
                <h4 className="rightbarFriendTitle">User friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                            <div className="rightbarFollowing">
                                <img
                                    src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noProfilePicture.jpeg"}
                                    alt=""
                                    className="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };
    return (
        // isLoading ? <div>Loading....</div> :
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar /> : <HomeRightbar />}
            </div>
        </div>
    );

}