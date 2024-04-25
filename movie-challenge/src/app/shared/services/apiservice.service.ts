import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatMetaData } from 'src/utils/transformers';
import { MetaData } from 'src/models/metaData';
import { Filters } from 'src/models/filters';
import { Genre } from 'src/models/genres';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private readonly BASE_URL ="https://api.themoviedb.org/3/";
  private readonly MOVIES ="discover/movie?include_adult=false&include_video=false&language=pt-br&with_keywords=15097&without_keywords=470%2C458%2C12377%2C2150%2C168678%2C2804%2C5350%2C3358%2C209522%2C2509%2C154896%2c234364%2C246%2C263548%2C204905%2C169280%2C317828%2C249004";
 private readonly GENRES = "genre/movie/list";

//const url = 'page=2&sort_by=popularity.desc&with_genres=27%7C53';

private readonly HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.TOKEN_API}`
  })

};

  constructor(
    private readonly http: HttpClient
  ) { }
  
  getMovies(filters?: Filters):Observable<MetaData>{
    if(!filters){
      filters = {page:1}
    }
   return this.http.get<MetaData>(`${this.BASE_URL+this.MOVIES}&page=${filters.page}&sort_by=popularity.desc&with_genres=27%7C53%7C16`,this.HTTP_OPTIONS).pipe(
    map(
      (resp: any) =>{
        console.log(resp);
        return formatMetaData(resp);
      }

    )
   )
  }
  getMoviesGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(`${this.BASE_URL+this.GENRES}`, this.HTTP_OPTIONS).pipe(
      map((resp: any) => {
        return resp.genres.map((genre: any) => {
          return {
            id: genre.id,
            name: genre.name
          };
        });
      })
    );
  }

}
