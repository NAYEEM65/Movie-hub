import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SingleContent from '../SingleContent/SingleContent';
import CustomPagination from '../CustomPagination/CustomPagination';
import Genres from '../Genres/Genres';
import './Movies.css';
import useGenre from '../../hooks/useGenre';

const Movies = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreForUrl = useGenre(selectedGenres);

    const fetchURL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreForUrl}`;
    const fetchMovies = async () => {
        const { data } = await axios.get(fetchURL);
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    };
    useEffect(() => {
        fetchMovies();
        // eslint-disable-next-line
    }, [page, genreForUrl]);
    return (
        <div>
            <span className="pageTitle">Movies</span>
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
                            media_type="movie"
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

export default Movies;
