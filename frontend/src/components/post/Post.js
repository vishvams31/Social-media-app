import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Post({ post }) {
    const [Like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const [showDropdown, setShowDropdown] = useState(false);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user: currentUser } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(post.desc);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching user:', error);
                // Handle error, show message to user, etc.
            }
        };
        fetchUser();
    }, [post.userId]);

    const likeHandler = () => {
        try {
            axios.put("http://localhost:8800/api/posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) {
            console.error('Error liking post:', err);
            // Handle error, show message to user, etc.
        }
        setLike(isLiked ? Like - 1 : Like + 1);
        setIsLiked(!isLiked);
    };

    const handleEditPost = () => {
        setIsEditing(true);
    };
    const handleDropdown = () => {
        if (currentUser._id === post.userId) {
            setShowDropdown(!showDropdown);
        }// Toggle dropdown visibility
    };

    const handleUpdatePost = async () => {
        try {
            const updatedPost = {
                desc: editedContent,
                userId: currentUser._id // Include the userId for authentication
            };

            const response = await axios.put(`http://localhost:8800/api/posts/${post._id}`, updatedPost);

            if (response.status === 200) {
                // Post updated successfully
                console.log("Post updated:", response.data);
                window.location.reload()
                toast.success("your post updated successfully")
                // If you want to update the UI with the updated post, you can do so here
                // For example, you could update the post state with the updated post
            } else {
                console.error("Failed to update post:", response.data);
                // Handle error - show message to user, etc.
            }
        } catch (error) {
            console.error("Error updating post:", error);
            // Handle error - show message to user, etc.
        }
        // Implement logic to handle updating post
        setShowDropdown(false); // Close the dropdown menu after clicking the option
        setIsEditing(false);
    };





    const handleDeletePost = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                console.log(post.userId)
                await axios.delete(`http://localhost:8800/api/posts/${post._id}`, {
                    data: { userId: post.userId }
                });
                window.location.reload();
                setTimeout(() => {
                    toast.success("successfully deleted")
                }, 5000)
            }
            catch (error) {
                console.error('Error deleting post:', error);
            }
        }

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
                                <span><button className='updateButton' onClick={handleUpdatePost}>Update</button></span>
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
                        <img className='likeIcon' src={`${PF}like.png`} onClick={likeHandler}></img>
                        <img className='likeIcon' src={`${PF}heart.png`} onClick={likeHandler} alt=""></img>
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
