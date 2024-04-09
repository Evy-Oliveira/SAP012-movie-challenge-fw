import { Movie } from "../models/movie";

export function formatMovie(apiMovieData: any): Movie {
    const url = "https://image.tmdb.org/t/p/w500"; // url da base API TMDB para imagens.

    const formatedMovie: Movie = {
        id: apiMovieData.id,
        original_title: apiMovieData.original_title,
        overview: apiMovieData.overview,
        release_date: new Date(apiMovieData.release_date).getFullYear().toString(),
        poster_path: `${url}${apiMovieData.poster_path}`,
    }
    return formatedMovie

}