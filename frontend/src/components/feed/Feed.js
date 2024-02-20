import React, { useEffect, useState } from 'react'
import './feed.css'
import Share from '../share/Share'
import axios from 'axios'
import Post from '../post/Post'

export default function Feed() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get("http://localhost:8800/api/posts/timeline/65d31c06701e1c7c7dfdc6a9")
            console.log(res)
        };
        fetchPosts();
    }, [])
    return (
        <div className='feed'>
            <div className='feedWrapper'>
                <Share />
                {/* {Posts.map(p => (

                    <Post key={p.id} post={p} />
                ))} */}
            </div>
        </div>
    )
}
