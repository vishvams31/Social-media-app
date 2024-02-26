import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Cancel } from '@mui/icons-material';
import "./share.css";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import { useForm } from 'react-hook-form';

export default function Share() {
    const user = useSelector(state => state.auth.user);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // const desc = useRef();
    const [file, setFile] = useState(null);
    const { register, handleSubmit } = useForm();

    const submitHandler = async (dat, event) => {
        event.preventDefault();

        console.log(dat)
        const newPost = {
            userId: user._id,
            desc: dat.desc,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost);
            try {
                await axios.post("http://localhost:8800/api/upload", data);
            } catch (err) { }
        }
        try {
            await axios.post("http://localhost:8800/api/posts", newPost);
            window.location.reload();
            setTimeout(() => {
                toast.success("Post uploaded")
            }, 2000)
        } catch (err) { }
    };

    return (
        <div className="share">
            <div className="shareWrapper">
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="shareTop">
                        <img
                            className="shareProfileImg"
                            src={
                                user.profilePicture
                                    ? PF + user.profilePicture
                                    : PF + "person/noAvatar.png"
                            }
                            alt=""
                        />
                        <input
                            placeholder={"What's in your mind " + user.username + "?"}
                            className="shareInput"
                            // ref={desc}
                            {...register("desc")}
                        />
                    </div>
                    <hr className="shareHr" />
                    {file && (
                        <div className="shareImgContainer">
                            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                        </div>
                    )}
                    <div className="shareBottom" >
                        <div className="shareOptions">
                            <label htmlFor="file" className="shareOption">
                                <PermMediaIcon htmlColor="tomato" className="shareIcon" />
                                <span className="shareOptionText">Photo or Video</span>
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                            <div className="shareOption">
                                <LabelIcon htmlColor="blue" className="shareIcon" />
                                <span className="shareOptionText">Tag</span>
                            </div>
                            <div className="shareOption">
                                <RoomIcon htmlColor="green" className="shareIcon" />
                                <span className="shareOptionText">Location</span>
                            </div>
                            <div className="shareOption">
                                <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon" />
                                <span className="shareOptionText">Feelings</span>
                            </div>
                        </div>
                        <button className="shareButton" type="submit">
                            Share
                        </button>
                    </div>
                </form >
            </div>
        </div>
    );
}