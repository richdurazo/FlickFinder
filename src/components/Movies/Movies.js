import React, {useState, useCallback} from 'react';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';
import classes from './Movies.module.scss';

const Movies = () => {
    const [userMovies, setUserMovies] = useState([]);

    const filteredMoviesHandler = useCallback((filteredMovies) => {
        setUserMovies(filteredMovies);
    }, []);

    return (
        <div className={classes.MoviesContainer}>
            <section className={classes.MoviesSearchList}>
                <MovieSearch onLoadMovies={filteredMoviesHandler} />
                <MovieList movies={userMovies} />
            </section>
        </div>
    );
}

export default Movies;
