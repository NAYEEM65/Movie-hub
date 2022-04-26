import React from 'react';
import Trending from '../Trending/Trending';
import Movies from '../Movies/Movies';
import TvShows from '../TvShows/TvShows';

const Home = () => {
    return (
        <div>
            <Trending />
            <Movies />
            <TvShows />
        </div>
    );
};

export default Home;
