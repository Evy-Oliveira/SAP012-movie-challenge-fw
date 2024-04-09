import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIService } from './shared/services/api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'movie-challenge';
  constructor(
    readonly service: APIService
  ){
    this.loadMovies()
  }

  loadMovies(){
    this.service.getMovies().subscribe({
      next: (resp) =>{
        console.log(resp)
      },
      error: (error) =>{
        console.error(error)
      }
    })
  }
}
