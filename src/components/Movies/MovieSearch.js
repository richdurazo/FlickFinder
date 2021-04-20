import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from './MovieSearch.module.scss';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 250,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
}));

const MovieSearch = React.memo((props) => {
    const styles = useStyles();
    const { onLoadMovies } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                setIsLoading(true);
                let uri = 'https://api.themoviedb.org/3'
                const hasValue = enteredFilter.length && inputRef.current.value.length;
                if (hasValue > 0) {
                    uri += '/search/movie'
                } else {
                    uri += '/movie/popular'
                }
                const query = enteredFilter.length === 0 ? '' : `&query=${enteredFilter}`
                axios.get(`${uri}?api_key=d7a3a18bf1f75a32e20a4c21012ba47b` + query)
                    .then(response => {
                        let loadedMovies = [];
                        if (
                            response.data
                            && response.data.results
                            && response.data.results.length
                            ) {
                                let resCopy = [...response.data.results];
                                loadedMovies = resCopy.map(movie => {
                                    return {
                                        id: movie.id,
                                        originalTitle: movie.original_title,
                                        title: movie.title,
                                        date: movie.release_date,
                                        overview: movie.overview,
                                        voteCount: movie.vote_count,
                                        voteAverage: movie.vote_average,
                                        poster: movie.poster_path
                                    }
                                });
                                setIsLoading(false);
                                onLoadMovies(loadedMovies)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                        setIsLoading(false);
                    })
            }

        }, 500);
        return () => {
            clearTimeout(timer)
        }
    }, [enteredFilter, inputRef, onLoadMovies])

    return (
        <div className={classes.MovieSearchContainer}>
            <h1>Flix Finder</h1>
            <div className={classes.SearchInputContainer}>
                <Paper component="form" className={styles.root}>
                    <InputBase
                        className={styles.input}
                        placeholder="Search movies"
                        inputProps={{ 'aria-label': 'search movies'}}
                        inputRef={inputRef}
                        type="text"
                        value={enteredFilter}
                        onChange={event => setEnteredFilter(event.target.value)} />
                </Paper>
            </div>
            {isLoading && <CircularProgress />}
        </div>
    );
});

export default MovieSearch;
