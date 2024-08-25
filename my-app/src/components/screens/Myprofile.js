import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../App';
import axios from 'axios';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import SavePost from './SavePost';
import Mypost from './Mypost';
import './profile.css';

function Myprofile() {
    const { userdata } = useContext(UserContext);
    const [data, setData] = useState({});
    const [selectedLabel, setSelectedLabel] = useState("POSTS");

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/v1/blog/view-profile/`, {
            headers: {
                Authorization: `Bearer ${userdata?.access}`,
            },
        })
        .then((response) => {
            setData(response.data.data);
            setSelectedLabel("POSTS");
        })
        .catch((err) => {
            console.log(err);
        });
    }, [userdata?.access]);

    const handleChange = (event, newValue) => {
        setSelectedLabel(newValue);
    };

    return (
        <div className='profile-section'>
            <div className='profile-pic'>
                {data.profile_picture === null ? "No profile picture" : <img src={data.profile_picture} alt="Profile" />}
            </div>
            <div className='data'>
                <span>Name: {data.name}</span>
                <div>
                    <span>Bio: {data.bio}</span>
                </div>
                <div>
                    <span>Info: {data.info}</span>
                </div>
            </div>
            <h2>Edit Your Profile</h2>
            <div className='footter-section'>
                <Box>
                    <div className='btn-navi'>
                        <BottomNavigation value={selectedLabel} onChange={handleChange}>
                            <BottomNavigationAction label="POSTS" value="POSTS" icon={<BookmarksIcon />} />
                            <BottomNavigationAction label="SAVED" value="SAVED" icon={<FavoriteIcon />} />
                        </BottomNavigation>
                    </div>
                    {selectedLabel === "SAVED" && <SavePost />}
                    {selectedLabel === "POSTS" && <Mypost />}
                </Box>
            </div>
        </div>
    );
}

export default Myprofile;
