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

  constructor(
    readonly service: APIService,
    readonly loadingService: LoadingService
  ) {
    this.loadMovies();
  }
  loadMovies() {
      this.loadingService.startLoading();
      this.service.getMovies().subscribe({
        next: (movies) => {
          console.log(movies);
          this.movies = movies;
          this.loadingService.stopLoading();
        }
      })
  }

}
