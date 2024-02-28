import React from 'react'
import './sidebar.css'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from "../../dummyData"

export default function Sidebar() {
    return (
        <div className='sidebar'>

            <div className='sidebarWrapper'>
                <ul className='sidebarList'>
                    <li className='sidebarListItem'>
                        <DynamicFeedIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Feed</span>
                    </li>
                    <li className='sidebarListItem'>
                        <ChatIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Chats</span>
                    </li>
                    <li className='sidebarListItem'>
                        <PlayCircleOutlineIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Videos</span>
                    </li>
                    <li className='sidebarListItem'>
                        <GroupsIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Groups</span>
                    </li>
                    <li className='sidebarListItem'>
                        <BookmarkIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Bookmarks</span>
                    </li>
                    <li className='sidebarListItem'>
                        <PsychologyAltIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Questions</span>
                    </li>
                    <li className='sidebarListItem'>
                        <WorkIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Jobs</span>
                    </li>
                    <li className='sidebarListItem'>
                        <EmojiEventsIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Events</span>
                    </li>
                    <li className='sidebarListItem'>
                        <SchoolIcon className='sidebarIcon' />
                        <span className='siddbarListItemText'>Courses</span>
                    </li>
                </ul>
                <button className='sidebarButton'> Show More</button>
                <hr className='sidebarHr' />
                <ul className='sidebarFriendList'>
                    {
                        Users.map(u => (
                            <CloseFriend key={u.id} user={u} />
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}