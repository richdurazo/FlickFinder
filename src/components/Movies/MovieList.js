import React from 'react';
import classes from './MovieList.module.scss';
import Movie from './Movie';

const MovieList = props => {
    return (
        <section className={classes.MovieList}>
            <ul>
                {props.movies.map(movie => <Movie key={movie.id}movie={movie}/>)}
            </ul>
        </section>
    );
}

export default MovieList;
