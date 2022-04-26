import { Badge } from '@mui/material';
import React from 'react';
import { img_300, unavailable } from '../../config/config';
import './singleContent.css';
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = (props) => {
    const { id, poster, title, date, media_type, vote_average } = props;
    return (
        <ContentModal media_type={media_type} id={id} className="media">
            <Badge badgeContent={vote_average} color={vote_average < 7 ? 'primary' : 'secondary'} />
            <img
                className="poster"
                src={poster ? `${img_300}/${poster}` : unavailable}
                alt={title}
            />
            <b className="title">{title}</b>
            <span className="subtitle">
                {media_type === 'tv' ? 'TV Series' : 'Movie'}
                <span className="subtitle">{date}</span>
            </span>
        </ContentModal>
    );
};

export default SingleContent;
