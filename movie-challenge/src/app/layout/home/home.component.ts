import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIService } from 'src/app/shared/services/apiservice.service';
import { LoadingService } from 'src/app/shared/services/loading-service.service';
import { Movie } from 'src/models/movie';
import { Option } from 'src/models/option';
import { formatGenresToMap, formatGenresToOptions } from 'src/utils/transformers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMovies!: Movie[];
  showMovies!: Movie[];
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading$ = this.loadingService.isLoadingObservable;
  qParams:Params = this.aRoute.snapshot.queryParams;
  hasError:boolean = false;
  movieLoaded: boolean = false;
  genres: Map<number, string> = new Map<number, string>();
  options: Option[] = [];

  constructor(
    private readonly service: APIService,
    private readonly loadingService: LoadingService,
    private readonly aRoute: ActivatedRoute,
    private readonly router: Router
  ) {
    this.loadingService.startLoading();
    this.loadGenres();
  }
  ngOnInit(): void {
    setTimeout(() =>  {
      this.onSelectPage(this.qParams['page'] ?? 1);
    },2000);
  }
  loadMovies() {
   this.movieLoaded = false;
   this.service.getMovies({page:this.currentPage},this.genres).subscribe({
  next: (resp) => {
    this.movieLoaded = true;
    this.hasError = false;
    console.log(resp);
    this.allMovies = resp.movies;
    this.showMovies = resp.movies;
    this.totalPages = resp.metaData.pagination.totalPages;
    this.router.navigate([],{
      queryParams:{
        page:this.currentPage
      }
    })
    },
  error: (error) =>{
    this.movieLoaded = true;
    this.hasError = true;
    this.loadingService.stopLoading();
    console.error(error);
  },
  complete:() =>{
    this.loadingService.stopLoading();
  }
});
  }
  onSelectPage(event: number){
    this.currentPage = event;
    this.loadMovies();
  }
  loadGenres(){
    this.service.getMoviesGenres().subscribe({
      next:(resp) =>{
        this.genres = formatGenresToMap(resp);
        this.options = formatGenresToOptions(resp);
      },
      error:(error) => {
        console.error(error);
      },
    })
  };
 onSelectGenre(event: Option){
  console.log(event.value);
  if(event && event.value){
    const genreId = event.value;
    const genreMap = new Map<number, string>();
    genreMap.set(parseInt(genreId, 10), '');
    this.showMovies = this.allMovies.filter(value => {
      console.log(value.original_title + " " + value.genres)
      return value.genres.includes(event.label);
    })
  }
 }
 onGenreClear(){
  this.loadMovies();
 }
}

