import { useEffect, useState } from 'react';
import axios from 'axios';
import { getMovieList, movieIMG, baseURL, apiKEY } from './api';

function App() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [movieDetail, setMovieDetail] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [genres, setGenres] = useState([]);
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClose = () => setOpen(false);

    const handleMovieDetail = async (id) => {
        try {
            const req = await axios.get(`${baseURL}/movie/${id}?api_key=${apiKEY}`);
            // console.log(req.data);
            setMovieDetail(req.data);
            setGenres(req.data.genres);
            setIsLoading(false);
        } catch (err) {
            console.log('Gagal', err);
            setIsLoading(true);
        }
    };

    const onHandleMovieDetail = (id) => {
        handleMovieDetail(id);
        setOpen(true);
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
        <div className='App min-h-screen w-full flex flex-col items-center justify-between px-4 pb-32 gap-10'>
            <section className='max-w-7xl flex flex-wrap justify-center items-center mt-40 gap-y-14'>
                <h1 className='text-3xl md:text-5xl uppercase text-center font-semibold text-white'>
                    Ram API Movies
                </h1>
                <div className='w-full flex justify-center items-center'>
                    <form onSubmit={onSubmitSearch}>
                        <div className='relative px-3 flex justify-between items-center w-[300px] md:w-[500px] h-16 rounded-lg shadow-lg bg-white overflow-hidden'>
                            <div className='flex items-center h-full w-12 text-gray-300'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='h-6 w-6'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    />
                                </svg>
                            </div>

                            <input
                                className='peer h-full w-full outline-none text-sm text-gray-700 pr-2'
                                type='text'
                                id='search'
                                placeholder='Search something..'
                                onChange={handleSearch}
                                value={keyword}
                            />
                        </div>
                    </form>
                </div>
                <div className='flex flex-wrap justify-center md:justify-between items-center gap-y-10'>
                    {popularMovies?.map((movie) => {
                        return (
                            <article
                                className='group flex flex-wrap max-w-[200px] h-[300px] gap-2 cursor-pointer text-left my-[50px] mx-[20px]'
                                key={movie.id}
                                onClick={() => onHandleMovieDetail(movie.id)}
                            >
                                <picture className='overflow-hidden block'>
                                    <img
                                        src={`${movieIMG}/${movie.poster_path}`}
                                        alt='Movie Poster'
                                        className='group-hover:scale-125 ease-in duration-150 w-full h-full block object-cover rounded-[5px]'
                                    />
                                </picture>
                                <div>
                                    <p className='text-sm text-slate-400'>{movie.release_date}</p>
                                    <h1 className='text-lg font-semibold text-white'>
                                        {movie.title}
                                    </h1>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
            {open ? (
                <div className='movieDetail-container fixed flex top-[-1px] w-full min-h-screen justify-center items-start overflow-scroll'>
                    <div className='movieDetail-backdrop-container'>
                        <img
                            src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movieDetail.backdrop_path}`}
                            className='movieDetail-backdrop w-full top-[10px] h-[50vh] object-cover'
                            alt={isLoading ? 'Loading...' : movieDetail.title + 'Poster'}
                        ></img>
                        <div className='shadow'></div>
                    </div>
                    <div className='movieDetail relative justify-center flex flex-col md:flex-row gap-10 mt-10 items-start content-start text-left text-[0.9rem] px-[40px] py-[3vw] bottom-[250px]'>
                        <div
                            onClick={handleClose}
                            className='movieDetail-close block w-full md:hidden'
                        >
                            <span className='cursor-pointer py-[1px] px-[10px] absolute rounded-[20px] border-2 border-white'>
                                X
                            </span>
                        </div>
                        <img
                            src={`${movieIMG}/${movieDetail.poster_path}`}
                            className='movieDetail-poster w-[150px] h-[250px] md:w-[240px] md:h-[350px] rounded-[5px]'
                            alt={isLoading ? 'Loading...' : movieDetail.title + 'Poster'}
                        ></img>

                        <div className='movieDetail-disc'>
                            <div className='movieDetail-title font-semibold max-w-[25ch] text-[1.7rem]'>
                                <h1>{isLoading ? 'Loading...' : movieDetail.title}</h1>
                            </div>
                            <div className='movieDetail-genres mt-[20px] text-slate-400'>
                                <p>{`Genres: ${
                                    isLoading ? 'Loading...' : movieDetail.genresList
                                }`}</p>
                            </div>
                            <div className='text-slate-400'>
                                <p>
                                    {' '}
                                    {`Runtime: ${
                                        isLoading ? 'Loading...' : movieDetail.runtime + ' min'
                                    }`}
                                </p>
                            </div>
                            <div className='text-slate-400'>{`Release date: ${
                                isLoading ? 'Loading...' : movieDetail.release_date
                            }`}</div>
                            <h4 style={{ color: '#eaeaea', marginTop: '30px' }}>Overview</h4>
                            <div className='movieDetail-overview text-[1rem] max-w-7xl'>
                                {isLoading ? 'Loading...' : movieDetail.overview}
                            </div>
                        </div>
                        <div
                            onClick={handleClose}
                            className='movieDetail-close hidden md:block w-full'
                        >
                            <span className='cursor-pointer py-[1px] px-[10px] absolute rounded-[20px] border-2 border-white'>
                                X
                            </span>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default App;
