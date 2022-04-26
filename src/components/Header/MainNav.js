import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import './Header.css';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { Home } from '@mui/icons-material';

export default function SimpleBottomNavigation() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (value === 0) navigate('/');
        else if (value === 1) navigate('/trending');
        else if (value === 2) navigate('/movies');
        else if (value === 3) navigate('/tvshows');
        else if (value === 4) navigate('/search');
    }, [value, navigate]);

    return (
        <div className="headerNav">
            <Box className="MainNav" x={{ width: 500 }}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<Home />} />
                    <BottomNavigationAction label="Trending" icon={<WhatshotIcon />} />
                    <BottomNavigationAction label="Movies" icon={<MovieIcon />} />
                    <BottomNavigationAction label="Tv Shows" icon={<TvIcon />} />
                    <BottomNavigationAction label="Search" icon={<SearchIcon />} />
                </BottomNavigation>
            </Box>
        </div>
    );
}
