import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleContent from '../SingleContent/SingleContent';
import CustomPagination from '../CustomPagination/CustomPagination';
import './Trending.css';

const Trending = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`,
        );
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    };
    useEffect(() => {
        fetchTrending();
        // eslint-disable-next-line
    }, [page]);
    return (
        <div>
            <span className="pageTitle">Trending</span>
            <div className="trending">
                {content &&
                    content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type={item.media_type}
                            vote_average={item.vote_average}
                        />
                    ))}
            </div>
            <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
        </div>
    );
};

export default Trending;
