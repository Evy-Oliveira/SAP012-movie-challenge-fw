import { Component, Output } from '@angular/core';
import { APIService } from 'src/app/shared/services/apiservice.service';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @Output() movies!: Movie[];

  constructor(
    readonly service: APIService
  ){
    this.loadMovies();
  }
  loadMovies(){
    this.service.getMovies().subscribe({
      next:(movies) => {
        console.log(movies);
        this.movies = movies;
      }
    })
  }

}
