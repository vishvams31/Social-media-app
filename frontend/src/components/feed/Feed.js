import { useContext, useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


export default function Feed({ username }) {
    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.auth.user)

    const handleDeletePost = async (post) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this post?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8800/api/posts/${post._id}`, {
                    data: { userId: post.userId }
                });
                    setPosts(posts.filter((ele)=>ele._id!==post._id))
                    toast.success("successfully deleted")
                
            }
            catch (error) {
                console.error('Error deleting post:', error);
            }
        }

    };

    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
                : await axios.get("http://localhost:8800/api/posts/timeline/" + user._id);
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
            console.log(Post)
        };
        fetchPosts();
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {!(!username || username === user.username) || Post.length <= 0 && <div>User has no posts yet</div>}
                {posts.map((p) => (
                    <Post key={p._id} post={p} handleDeletePost={()=>handleDeletePost(p)} />
                ))
                }
            </div>
        </div>
    );
}