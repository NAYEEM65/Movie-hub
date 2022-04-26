import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_original } from '../../config/config';

const handleDragStart = (e) => e.preventDefault();

const MainCarousel = () => {
    const [content, setContent] = useState([]);
    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=1`,
        );
        setContent(data.results);
    };
    console.log(content);
    const items = content.map((c) => (
        <div className="main__carouselItem">
            <img
                src={`${img_original}/${c.backdrop_path}`}
                alt={c?.name}
                onDragStart={handleDragStart}
                className="carouselItem__img"
            />
            <b className="carouselItem__txt1">{c.title || c.name}</b>
        </div>
    ));
    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 1,
        },
        1024: {
            items: 1,
        },
    };
    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, []);
    return (
        <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            animationType="fadeout"
            autoHeight
            autoPlayInterval="1000"
            autoWidth
            autoPlay
        />
    );
};

export default MainCarousel;
