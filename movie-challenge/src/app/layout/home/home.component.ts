import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIService } from 'src/app/shared/services/apiservice.service';
import { LoadingService } from 'src/app/shared/services/loading-service.service';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies!: Movie[];
  currentPage: number = 0;
  totalPages: number = 0;
  isLoading$ = this.loadingService.isLoadingObservable;
  qParams:Params = this.aRoute.snapshot.queryParams;
  hasError:boolean = false;
  movieLoaded: boolean = false;

  constructor(
    private readonly service: APIService,
    private readonly loadingService: LoadingService,
    private readonly aRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  
    this.loadingService.startLoading();
    setTimeout(() =>  {
      this.loadMovies();
      this.loadGenres();
    },3000);
  }
  ngOnInit(): void {
    this.onSelectPage(this.qParams['page'] ?? 1);
    console.log(this.currentPage);
    console.log(this.aRoute.snapshot.queryParams);
  }
  loadMovies() {
   this.movieLoaded = false;
   this.service.getMovies({page:this.currentPage}).subscribe({
  next: (resp) => {
    this.movieLoaded = true;
    this.hasError = false;
    console.log(resp);
    this.movies = resp.movies;
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
        console.log(resp);
      },
      error:(error) => {
        console.error(error);
      },
    })
  };

}

