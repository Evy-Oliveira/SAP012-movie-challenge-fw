import { MetaData } from "src/models/metaData";
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

export function formatMetaData(apiMovieResp: any): MetaData{
    let transformedMovies = apiMovieResp.results.map((movie: any) => {
        return formatMovie(movie);
      })
    
      const formatedData: MetaData ={
        metaData: {
            pagination: {
              currentPage: apiMovieResp.page,
              totalPages: apiMovieResp.total_pages
            }
          },
        movies: transformedMovies
      }
      return formatedData;
}