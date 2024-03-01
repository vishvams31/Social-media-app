import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { fetchUserProfile } from '../../services/Service'



export default function Profile() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({});
    const username = useParams().username;
    console.log(username)
    // const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchUserProfile(username, setUser);
    }, [username]);

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
                            <img
                                className="profileUserImg"
                                src={
                                    user.profilePicture
                                        ? PF + user.profilePicture
                                        : PF + "person/noProfilePicture.jpeg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    {MemorizeComp}
                </div>
            </div>
        </>
    );

}