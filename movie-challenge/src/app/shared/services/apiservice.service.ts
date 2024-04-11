import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie } from '../../../models/movie';
import { environment } from 'src/environments/environment';
import { formatMovie } from 'src/utils/transformers';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseUrl ="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&with_keywords=15097";
  
//const url = 'page=2&sort_by=popularity.desc&with_genres=27%7C53';

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.TOKEN_API}`
  })

};

  constructor(
    readonly http: HttpClient
  ) { }
  getMovies():Observable<Movie[]>{
   return this.http.get<Movie[]>(`${this.baseUrl}&page=1&sort_by=popularity.desc&with_genres=27%7C53`,this.httpOptions).pipe(
    map(
      (resp: any) =>{
        let transformedMovies = resp.results.map((movie: any) => {
          return formatMovie(movie);
        })
        return transformedMovies;
      }

    )
   )
  }
}
