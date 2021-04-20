import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import classes from './MovieSearch.module.scss';

const MovieSearch = React.memo((props) => {
    const { onLoadMovies } = props;
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (enteredFilter === inputRef.current.value) {
                const query = enteredFilter.length === 0 ? '' : `&query=${enteredFilter}`
                axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d7a3a18bf1f75a32e20a4c21012ba47b` + query)
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
                                onLoadMovies(loadedMovies)
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }

        }, 500);
        return () => {
            clearTimeout(timer)
        }
    }, [enteredFilter, inputRef, onLoadMovies])

    return (
        <div className={classes.MovieSearchContainer}>
            <h1>Movie Search App</h1>
            <div className="search-input">
                <input
                    ref={inputRef}
                    type="text"
                    value={enteredFilter}
                    onChange={event => setEnteredFilter(event.target.value)} />
            </div>
        </div>
    );
});

export default MovieSearch;
