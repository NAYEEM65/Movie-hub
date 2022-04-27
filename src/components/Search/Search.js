import { Button, Tab, Tabs, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import './Search.css';
import axios from 'axios';
import SingleContent from '../SingleContent/SingleContent';
import CustomPagination from '../CustomPagination/CustomPagination';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 52,
        backgroundColor: '#E8630A',
    },
});

const Search = () => {
    const classes = useStyles();
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [content, setContent] = useState();
    const [numberOfPages, setNumberOfPages] = useState();

    const drkTheme = createTheme({
        palette: {
            type: 'dark',
            primary: {
                main: '#fff',
            },
        },
    });
    const fetchSearch = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? 'tv' : 'movie'}?api_key=${
                process.env.REACT_APP_API_KEY
            }&language=en-US&query=${searchText}s&page=${page}&include_adult=false`,
        );
        setContent(data.results);
        setNumberOfPages(data.total_pages);
    };
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        //eslint-disable-next-line
    }, [type, page]);
    return (
        <div>
            <ThemeProvider theme={drkTheme}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 15,
                    }}
                    className="search"
                >
                    <TextField
                        style={{ flex: 1 }}
                        className="search__box"
                        label="Search"
                        variant="filled"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        className={classes.root}
                        style={{ marginLeft: 10 }}
                        onClick={fetchSearch}
                    >
                        {' '}
                        <SearchIcon />
                    </Button>
                </div>
                <div className="search__tab">
                    <Tabs
                        style={{ display: 'flex', justifyContent: 'center' }}
                        value={type}
                        indecatorcolor="primary"
                        textColor="primary"
                        onChange={(e, newValue) => {
                            setType(newValue);
                            setPage(1);
                        }}
                    >
                        <Tab style={{ width: '50%' }} label="Search Movies" />
                        <Tab style={{ width: '50%' }} label="Search TV Series" />
                    </Tabs>
                </div>
            </ThemeProvider>
            <div className="trending">
                {content &&
                    content.map((item) => (
                        <SingleContent
                            key={item.id}
                            id={item.id}
                            poster={item.poster_path}
                            title={item.title || item.name}
                            date={item.first_air_date || item.release_date}
                            media_type={type ? 'tv' : 'movie'}
                            vote_average={item.vote_average}
                        />
                    ))}
                {searchText &&
                    !content &&
                    (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numberOfPages > 1 && (
                <CustomPagination setPage={setPage} numberOfPages={numberOfPages} />
            )}
        </div>
    );
};

export default Search;
