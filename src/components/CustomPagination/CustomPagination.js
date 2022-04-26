import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import './CustomPagination.css';

export default function PaginationOutlined({ setPage, numberOfPages }) {
    const handlePageChange = (page) => {
        setPage(page);
        window.scroll(0, 0);
    };
    return (
        <div spacing={2}>
            <Pagination
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '10px',
                    color: 'white',
                }}
                count={numberOfPages}
                onChange={(e) => handlePageChange(e.target.textContent)}
                color="primary"
            />
        </div>
    );
}
