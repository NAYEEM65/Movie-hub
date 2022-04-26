import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleContent from '../SingleContent/SingleContent';
import CustomPagination from '../CustomPagination/CustomPagination';
import './TvShows.css';
import Genres from '../Genres/Genres';
import useGenre from '../../hooks/useGenre';

const TvShows = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForUrl = useGenre(selectedGenres);

    const fetchURL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&with_genres=${genreForUrl}`;

    const fetchTvShows = async () => {
        const { data } = await axios.get(fetchURL);
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    };
    useEffect(() => {
        fetchTvShows();
        // eslint-disable-next-line
    }, [page, genreForUrl]);
    return (
        <div>
            <span className="pageTitle">TV Shows</span>
            <Genres
                type="movie"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
                {content &&
                    content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type="tv"
                            vote_average={item.vote_average}
                        />
                    ))}
            </div>
            {numberOfPages > 1 && (
                <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            )}
        </div>
    );
};

export default TvShows;
