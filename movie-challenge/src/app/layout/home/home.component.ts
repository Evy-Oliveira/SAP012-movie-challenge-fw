import { Component, Output } from '@angular/core';
import { APIService } from 'src/app/shared/services/apiservice.service';
import { LoadingService } from 'src/app/shared/services/loading-service.service';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() movies!: Movie[];

  isLoading$ = this.loadingService.isLoadingObservable;
  hasError:boolean = false;

  constructor(
    readonly service: APIService,
    readonly loadingService: LoadingService
  ) {
    
    this.loadingService.startLoading();
    // this.loadMovies();
    setTimeout(
      () =>  this.loadMovies(),
      3000
    );
  }
  loadMovies() {
  
this.service.getMovies().subscribe({
  next: (movies) => {
    this.hasError = false;
    console.log(movies);
    this.movies = movies;
  },
  error: (error) =>{
    this.hasError = true;
    this.loadingService.stopLoading();
    console.error(error);
  },
  complete:() =>{
    this.loadingService.stopLoading();
  }
})

  }
}

