import React, { useState, useContext } from 'react'
import toast from 'react-hot-toast'
import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { AuthContext } from '../../context/AuthContext';
import { useRef } from 'react'
import axios from 'axios'
export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user } = useContext(AuthContext)
    const desc = useRef();
    const [file, setFile] = useState(null)
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("/posts", newPost);
            toast.success("created post successfully!!")
            // window.location.reload();
        } catch (err) { }
    };
    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img className='shareProfileImg' src={user.profilePicture ? PF + user.profilePicture : PF + 'assets/person/noProfilePicture'} alt="" />
                    <input placeholder={"what's in your mind " + user.username + "?"} className='shareInput' ref={desc} />
                </div>
                <hr className='shareHr' />
                <form className='shareBottom' onSubmit={submitHandler}>
                    <label htmlFor='file' className='shareOptions'>
                        <div className='shareOption'>
                            <PermMediaIcon style={{ color: "tomato" }} className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
                            <input style={{ display: "none" }} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className='shareOption'>
                            <LabelIcon style={{ color: "blue" }} className='shareIcon' />
                            <span className='shareOptionText'>Tag</span>
                        </div>
                        <div className='shareOption'>
                            <RoomIcon style={{ color: "green" }} className='shareIcon' />
                            <span className='shareOptionText'>Location</span>
                        </div>
                        <div className='shareOption'>
                            <EmojiEmotionsIcon style={{ color: "goldenrod" }} className='shareIcon' />
                            <span className='shareOptionText'>Feelings</span>
                        </div>
                    </label>
                    <button className='shareButton' type='submit'>Share</button>
                </form>
            </div>
        </div >
    )
}
