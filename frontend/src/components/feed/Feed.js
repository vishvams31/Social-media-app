import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useSelector } from "react-redux";
import { handleDeletePost } from '../../services/Service'
import { fetchPosts } from '../../services/Service'


export default function Feed({ username }) {
    console.log(username)
    const [posts, setPosts] = useState([]);
    const user = useSelector(state => state.auth.user)

    useEffect(() => {
        fetchPosts(username, user, setPosts);
        console.log(posts)
    }, [username, user._id]);

    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {username && username !== user.username && posts.length === 0 && <div className="noPostMessage">{username} has no posts yet</div>}
                {posts.map((p) => (
                    <Post key={p._id} post={p} handleDeletePost={() => handleDeletePost(p, setPosts, posts)} />
                ))
                }
            </div>
        </div>
    );
}