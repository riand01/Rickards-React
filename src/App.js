import { useEffect, useState } from "react";

import MovieCard from "./MovieCard";
import './App.css';
import SearchIcon from './search.svg';
// bc674824

const API_URL = 'http://www.omdbapi.com?apikey=bc674824';

const movie1 = {
    "Title": "Amazing Spiderman Syndrome",
    "Year": "2012",
    "imdbID": "tt2586634",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
        <div className="app">
            <h1>RickFlix</h1>

            <div className="search">
                <input 
                    placeholder="Sök efter filmer och klicka på förstoringsglaset"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie}/>
                        ))}
                    </div>
                ) :
                (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }
        </div>
    );
}

export default App;