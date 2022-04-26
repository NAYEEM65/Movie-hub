import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainNav from './components/Header/MainNav';
import Trending from './components/Trending/Trending';
import Movies from './components/Movies/Movies';
import TvShows from './components/TvShows/TvShows';
import Search from './components/Search/Search';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trending" element={<Trending />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tvshows" element={<TvShows />} />
                    <Route path="/search" element={<Search />} />
                </Routes>
                <Footer />
                <MainNav />
            </Router>
        </div>
    );
}

export default App;
