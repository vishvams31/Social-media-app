import React from 'react'
import './share.css'
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import RoomIcon from '@mui/icons-material/Room';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
export default function Share() {
    return (
        <div className='share'>
            <div className='shareWrapper'>
                <div className='shareTop'>
                    <img className='shareProfileImg' src='assets/person/4.jpeg' alt="" />
                    <input placeholder="what's in your mind" className='shareInput' />
                </div>
                <hr className='shareHr' />
                <div className='shareBottom'>
                    <div className='shareOptions'>
                        <div className='shareOption'>
                            <PermMediaIcon style={{ color: "tomato" }} className='shareIcon' />
                            <span className='shareOptionText'>Photo or Video</span>
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
                    </div>
                    <button className='shareButton'>Share</button>
                </div>
            </div>
        </div >
    )
}
