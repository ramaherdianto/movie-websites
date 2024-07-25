import axios from 'axios';

export const baseURL = 'https://api.themoviedb.org/3';
export const apiKEY = 'b0002ebea15015d3ff5da2f475f8b062';
export const movieIMG = 'https://image.tmdb.org/t/p/w500';

export const getMovieList = async () => {
    const movie = await axios.get(`${baseURL}/movie/popular?page=1&api_key=${apiKEY}`);
    return movie.data.results;
};
