import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import classes from './Movie.module.scss';

const Movie = props => {
    const { movie } = props;
    const [shortDescription, setShortDescription] = useState('');
    const [movieDate, setMovieDate] = useState('');

    useEffect(() => {
        let shortOverview = movie.overview.substring(0, 100) + '...';
        setShortDescription(shortOverview);
        let date = movie.date.split('-')[0];
        setMovieDate(date);
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
                    <Rating name="read-only" value={movie.voteAverage} readOnly />
                    <div>{movie.voteCount}</div>
                </div>
            </div>
        </li>
    );
}

export default Movie;
