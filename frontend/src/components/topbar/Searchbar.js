import React, { useState, useCallback } from 'react';
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { searchUser } from '../../services/Service';

const Searchbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = useCallback(async () => {
        const user = await searchUser(searchTerm);
        if (user) {
            navigate(`/profile/${user.username}`);
        } else {
            alert('User not found');
        }
    }, [searchTerm, navigate]);

    return (
        <div className="searchbar">
            <Search className="searchIconMUI" />
            <input type="text" placeholder="Search for friend, post or video" className="searchInput" value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            <button onClick={handleSearch} className="searchButton">Search</button>
        </div>
    );
};

export default Searchbar;
