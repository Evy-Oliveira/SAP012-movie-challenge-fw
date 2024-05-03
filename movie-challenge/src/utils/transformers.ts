import { MetaData } from "src/models/metaData";
import { Movie } from "../models/movie";
import { Genre } from "src/models/genres";
import { last } from "rxjs";
import { Option } from "src/models/option";
import { Optional } from "@angular/core";

export function formatMovie(apiMovieData: any, genreMap: Map<number, string>): Movie {
    const url = "https://image.tmdb.org/t/p/w500"; // url da base API TMDB para imagens.
    // console.log(genreMap);
    // console.log(apiMovieData.genre_ids);
    const formatedMovie: Movie = {
        id: apiMovieData.id,
        original_title: apiMovieData.original_title,
        overview: apiMovieData.overview,
        release_date: new Date(apiMovieData.release_date).getFullYear().toString(),
        poster_path: `${url}${apiMovieData.poster_path}`,
        genres: [],
    }
    apiMovieData.genre_ids.map((genre_id: number)=>{
      formatedMovie.genres.push(String(genreMap.get(genre_id)));
     })
    return formatedMovie;
}

export function formatMetaData(apiMovieResp: any,genreMap: Map<number, string>): MetaData{
    let transformedMovies = apiMovieResp.results.map((movie: any) => {
        return formatMovie(movie,genreMap);
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
export function formatGenresToMap(genresData: Genre[]): Map<number, string>{
  let genreMap = new Map<number, string>();
  if(genresData.length > 0)
  genresData.map(genre =>{
    genreMap.set(genre.id, genre.name);
  })
  // console.log(genreMap);
  return genreMap;
}
export function formatGenresToOptions(genres: Genre[]):Option[]{
  const formatedOptions:Option[] = genres.map(genre =>{
    return {value: String(genre.id), label: genre.name}
  });
  return formatedOptions;
}
