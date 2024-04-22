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
  currentPage: number = 0;
  totalPages: number = 0;

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
  loadMovies(filters?:{page:number}) {
    if(!filters){
      filters = {page:1}
    }
  
this.service.getMovies(filters).subscribe({
  next: (resp) => {
    this.hasError = false;
    console.log(resp);
    this.movies = resp.movies;
    this.currentPage = resp.metaData.pagination.currentPage;
    this.totalPages = resp.metaData.pagination.totalPages;
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

  onSelectPage(event: number){
    console.log(event);
    this.loadMovies({page:event})
  }
}

