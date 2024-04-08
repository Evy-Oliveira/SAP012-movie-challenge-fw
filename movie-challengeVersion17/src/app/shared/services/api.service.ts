import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../../models/movie';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  baseUrl ="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-br&with_keywords=15097"
  
//const url = 'page=2&sort_by=popularity.desc&with_genres=27%7C53';

  constructor(
    readonly http: HttpClient
  ) { }
  getMovies():Observable<Movie[]>{
   return this.http.get<Movie[]>(`${this.baseUrl}&page=1&sort_by=popularity.desc&with_genres=27%7C53`)
  }
}
