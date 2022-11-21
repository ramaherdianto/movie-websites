import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMovieList, movieIMG, baseURL, apiKEY } from './api';

function App() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [movieDetail, setMovieDetail] = useState([]);
    const [keyword, setKeyword] = useState('');

    // const search = async (q) => {
    //     const query = await searchMovie(q);
    //     setPopularMovies(query.results);
    // };

    const handleMovieDetail = async (id) => {
        try {
            const req = await axios.get(`${baseURL}/movie/${id}?api_key=${apiKEY}`);
            console.log(req.data);
        } catch (err) {
            console.log('Gagal', err);
        }
    };

    const onHandleMovieDetail = (id) => {
        handleMovieDetail(id);
    };

    const handleSearch = (e) => {
        setKeyword(e.target.value);
    };

    const onSubmitSearch = async (e) => {
        e.preventDefault();
        try {
            const search = await axios.get(
                `${baseURL}/search/movie?query=${keyword}&api_key=${apiKEY}`
            );
            setPopularMovies(search.data.results);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMovieList().then((results) => {
            setPopularMovies(results);
        });
    }, []);

    return (
        <div className='App'>
            <form onSubmit={onSubmitSearch}>
                <div className='search-section'>
                    <input
                        type='text'
                        placeholder='cari film...'
                        onChange={handleSearch}
                        value={keyword}
                    />
                    <button type='submit'>Search</button>
                </div>
            </form>
            <div className='movie-list-wrapper'>
                {popularMovies?.map((movie) => {
                    return (
                        <div
                            className='movie-item'
                            key={movie.id}
                            onClick={() => onHandleMovieDetail(movie.id)}
                        >
                            <div className='movie-title'>{movie.title}</div>
                            <img src={`${movieIMG}/${movie.poster_path}`} className='movie-img' />
                            <div className='movie-release-date'>{movie.release_date}</div>
                            <div className='movie-rating'>{movie.vote_average}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default App;
