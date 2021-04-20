import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import classes from './Movie.module.scss';

const Movie = props => {
    const { movie } = props;
    const [shortDescription, setShortDescription] = useState('');
    const [movieDate, setMovieDate] = useState('');
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (movie) {
            let shortOverview = movie.overview.length > 200 ? movie.overview.substring(0, 200) + '...' : movie.overview;
            setShortDescription(shortOverview);
            let date = movie.date.split('-')[0];
            setMovieDate(date);
            let rating = (movie.voteAverage / 10) * 5;
            setRating(rating)
        }
    }, [movie])
    
    return (
        <li>
            <div className={classes.MovieImageContainer}>
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
                    alt={movie.poster} /> 
            </div>
            <div className={classes.MovieCopyContainer}>
                <div className={classes.MovieTitle}>{movie.title}</div>
                <div className={classes.MovieDate}>{movieDate}</div>
                <div className={classes.Overview}>{shortDescription}</div>
                <div className={classes.ReviewRow}>
                    <Rating value={rating} readOnly size="small" />
                    <div className={classes.Reviews}>{movie.voteCount} reviews</div>
                </div>
            </div>
        </li>
    );
}

export default Movie;
