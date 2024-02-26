import "./topbar.css"
import { useContext, useState, useEffect } from 'react'
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import { useSelector } from "react-redux";

export default function Topbar() {
    const user = useSelector(state => state.auth.user);
    const [friends, setFriends] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate()
    const searchUser = (username) => {
        return friends.find(user => user.username.toLowerCase() === username.toLowerCase());
    };

    useEffect(() => {
        const getFriends = async () => {
            try {
                if (user && user._id) {
                    const URL = `http://localhost:8800/api/users/friends/${user._id}`;
                    const friendList = await axios.get(URL);
                    setFriends(friendList.data);
                }

            } catch (err) {
                console.log(err)
            }
        };
        getFriends();
    }, [user]);
    const handleSearch = () => {

        // Assuming you have a function to search for a user by username
        const user = searchUser(searchTerm);
        if (user) {
            navigate(`/profile/${user.username}`);
        } else {
            alert('User not found');
        }
    };
    console.log(user)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className="topbarContainer">
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <span className="logo">Zigsocial</span>
                    </Link>
                </div>
                <div className="topbarCenter">
                    <div className="searchbar">
                        <Search />
                        <input type="text" placeholder="Search for friend, post or video" className="searchInput" value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <button onClick={handleSearch} className="searchButton">Search</button>
                    </div>
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
                        <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noProfilePicture"} alt="" className="topbarImg" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
