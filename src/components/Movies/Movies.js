import React, {useState, useCallback} from 'react';
import MovieSearch from './MovieSearch';
import MovieList from './MovieList';

const Movies = () => {
    const [userMovies, setUserMovies] = useState([]);

    const filteredMoviesHandler = useCallback((filteredMovies) => {
        setUserMovies(filteredMovies);
    }, []);

    return (
        <div className="App">
            <section>
                <MovieSearch onLoadMovies={filteredMoviesHandler} />
                <MovieList movies={userMovies} />
            </section>
        </div>
    );
}

export default Movies;
