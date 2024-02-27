import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState } from 'react';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchUser } from '../../services/Service'
import { likeHandler } from '../../services/Service'
import { handleUpdatePost } from '../../services/Service'


export default function Post({ post, handleDeletePost }) {
    const [Like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const currentUser = useSelector(state => state.auth.user)
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.desc);
    // const [selectedImage, setSelectedImage] = useState(null);
    // const [imagePreview, setImagePreview] = useState(null);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        fetchUser(post, setUser);
    }, [post.userId]);

    const handleEditPost = () => {
        setIsEditing(true);
    };
    const handleDropdown = () => {
        if (currentUser._id === post.userId) {
            setShowDropdown(!showDropdown);
        }// Toggle dropdown visibility
    };

    return (

        <div className='post'>
            <div className='postWrapper'>
                <div className='postTop'>
                    <div className='postTopLeft'>
                        <Link to={`profile/${user.username}`}>
                            <img className='postProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noProfilePicture.jpeg"} alt="" />
                        </Link>
                        <span className='postUsername'>{user.username}</span>
                        <span className='postDate'>{format(post.createdAt)}</span>
                    </div>
                    <div className='postTopRight'>
                        <MoreVertIcon onClick={handleDropdown} />
                        {showDropdown && (
                            <div className="dropdown-content">
                                <button onClick={handleEditPost}>Edit</button>
                                <button onClick={handleDeletePost}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
                <div className='postCenter'>
                    {isEditing ? (
                        <>
                            <div>Image Description: </div>
                            <span>
                                <textarea className='postText' value={editedContent} onChange={(e) => setEditedContent(e.target.value)}></textarea>
                                <span><button className='updateButton' onClick={handleUpdatePost(editedContent, currentUser, post, setShowDropdown, setIsEditing)}>Update</button></span>
                            </span>
                        </>
                    ) : (
                        <>
                            <span className='postText'>{post.desc}</span>
                            <img className='postImg' src={PF + post.img} alt="" />
                        </>
                    )}
                </div>
                <div className='postBottom'>
                    <div className='postBottomLeft'>
                        <img className='likeIcon' src={`${PF}like.png`} onClick={() => likeHandler(post, setLike, setIsLiked, currentUser, Like, isLiked)}></img>
                        <img className='likeIcon' src={`${PF}heart.png`} oonClick={() => likeHandler(post, setLike, setIsLiked, currentUser, Like, isLiked)} alt=""></img>
                        <span className='postLikeCounter'>{Like} people like it</span>
                    </div>
                </div>
            </div>
        </div>
        // <div className='post'>
        //     <div className='postWrapper'>
        //         <div className='postTop'>
        //             <div className='postTopLeft'>
        //                 <Link to={`profile/${user.username}`}>
        //                     <img className='postProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF + "/person/noProfilePicture.jpeg"} alt="" />
        //                 </Link>
        //                 <span className='postUsername'>{user.username}</span>
        //                 <span className='postDate'>{format(post.createdAt)}</span>
        //             </div>
        //             <div className='postTopRight'>
        //                 <MoreVertIcon onClick={handleDropdown} />
        //                 {showDropdown && ( // Render dropdown when showDropdown is true
        //                     <div className="dropdown-content">
        //                         <button onClick={handleUpdatePost}>Update</button>
        //                         <button onClick={handleDeletePost}>Delete</button>
        //                     </div>
        //                 )}
        //             </div>
        //             {/* hello */}
        //         </div>
        //         <div className='postCenter'>
        //             <span className='postText'>{post?.desc}</span>
        //             <img className='postImg' src={PF + post.img} alt="" />
        //         </div>
        //         <div className='postBottom'>
        //             <div className='postBottomLeft'>
        //                 <img className='likeIcon' src={`${PF}like.png`} onClick={likeHandler}></img>
        //                 <img className='likeIcon' src={`${PF}heart.png`} onClick={likeHandler} alt=""></img>
        //                 <span className='postLikeCounter'>{Like} people like it</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}
