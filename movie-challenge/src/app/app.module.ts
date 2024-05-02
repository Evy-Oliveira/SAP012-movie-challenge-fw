import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieCardComponent } from './layout/movie-card/movie-card.component';
import { MovieListComponent } from './layout/movie-list/movie-list.component';
import { HomeComponent } from './layout/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './layout/pagination/pagination.component';
import { ListOptionsComponent } from './layout/list-options/list-options.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieCardComponent,
    MovieListComponent,
    HomeComponent,
    PaginationComponent,
    ListOptionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
