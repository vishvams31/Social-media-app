import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import UserInformation from "./userInformation";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../services/Service";
import { followHandler } from "../../services/Service";
import React from "react";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  // const { user: currentUser, dispatch } = useContext(AuthContext)
  const currentUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [followed, setFollowed] = useState(false);
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user?._id]);
  useEffect(() => {
    getFriends(user, setFriends);
  }, [user]);

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Jeel Maheshwari</b> and <b>3 other friends</b> have a birhday
            today.
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
          <button
            className="rightbarFollowButton"
            onClick={() =>
              followHandler(followed, user, currentUser, dispatch, setFollowed)
            }
          >
            {followed ? "Unfollow" : "follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <UserInformation user={user} />
        <h4 className="rightbarFriendTitle">User friends</h4>
        <div className="rightbarFollowings" key={friends._id}>
          {friends.friends &&
            friends.friends.map((friend) => (
              <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
                key={friend._id}
              >
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + "person/noProfilePicture.jpeg"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
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
