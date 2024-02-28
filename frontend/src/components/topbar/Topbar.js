// Topbar.js
import "./topbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Person, Chat, Notifications } from "@mui/icons-material"
import Searchbar from './Searchbar';

export default function Topbar() {
    const user = useSelector(state => state.auth.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topbarContainer">
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className="logo">Zigsocial</span>
                    </Link>
                </div>
                <div className="topbarCenter">
                    <Searchbar />
                </div>
                <div className="topbarRight">
                    <div className="topbarLinks">
                        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                            <span className="topbarLink">Homepage</span>
                        </Link>
                    </div>
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <Person />
                            <span className="topbarIconBadge">1</span>
                        </div>
                        <div className="topbarIconItem">
                            <Chat />
                            <span className="topbarIconBadge">2</span>
                        </div>
                        <div className="topbarIconItem">
                            <Notifications />
                            <span className="topbarIconBadge">1</span>
                        </div>
                    </div>
                    <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noProfilePicture.jpeg"} alt="" className="topbarImg" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
