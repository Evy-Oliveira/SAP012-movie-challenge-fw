import { Component, Input } from '@angular/core';
import { Movie } from 'src/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {

  // @Input() movie: Movie ={} as Movie; // retorna um obejto vazio mas diz que tem ser igual a Movie
  @Input() movie!: Movie;

}
