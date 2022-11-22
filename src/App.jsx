import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, styled } from '@mui/system';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Fade from '@mui/material/Fade';
import { getMovieList, movieIMG, baseURL, apiKEY } from './api';

function App() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [movieDetail, setMovieDetail] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [genres, setGenres] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleMovieDetail = async (id) => {
        try {
            const req = await axios.get(`${baseURL}/movie/${id}?api_key=${apiKEY}`);
            // console.log(req.data);
            setMovieDetail(req.data);
            setGenres(req.data.genres);
        } catch (err) {
            console.log('Gagal', err);
        }
    };

    const onHandleMovieDetail = (id) => {
        handleMovieDetail(id);
        setOpen(true);
    };

    const Modal = styled(ModalUnstyled)`
        position: fixed;
        z-index: 1300;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const style = (theme) => ({
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.mode === 'dark' ? '#0A1929' : 'white',
        border: '2px solid currentColor',
        boxShadow: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    });

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
            <div>
                <Modal
                    aria-labelledby='transition-modal-title'
                    aria-describedby='transition-modal-description'
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    // onClick={handleClose}
                    sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        WebkitTapHighlightColor: 'transparent',
                    }}
                >
                    <Fade in={open} timeout={400}>
                        <Box sx={style} key={movieDetail.id}>
                            <h3 onClick={handleClose}>X</h3>
                            <h2 id='transition-modal-title'>{movieDetail.title}</h2>
                            <img id='movie-img' src={`${movieIMG}/${movieDetail.poster_path}`} />
                            {genres.map((genre, index) => {
                                return (
                                    <div key={index}>
                                        <li>{genre.name}</li>
                                    </div>
                                );
                            })}
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}

export default App;
