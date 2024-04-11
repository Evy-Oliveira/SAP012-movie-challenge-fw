import { TestBed } from '@angular/core/testing';
import { APIService } from './apiservice.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {  of } from 'rxjs';

// let httpClientSpy: jasmine.SpyObj<HttpClient>;
let service: APIService;
describe('APIService', () => {
  beforeEach(() => {
    // httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIService]
    });
    service = TestBed.inject(APIService);
  });

  it('Deve ser criado um serviço', () => {
    
    expect(service).toBeTruthy();
  });

//   it('deve retornar um observable de filmes em uma chamada HTTP de sucesso', (done: DoneFn) =>{
  
//     //  service = new APIService(httpClientSpy);
   
//     const mockMovies  =[
//       {
//         id: 1011985,
//         original_title: "Kung Fu Panda 4",
//         overview: "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
//         release_date: "2024",
//         poster_path: "https://image.tmdb.org/t/p/w500/wkfG7DaExmcVsGLR4kLouMwxeT5.jpg",
//     }
//     ];

//     // httpClientSpy.get.and.returnValue(of(mockMovie));
//     const httpClientSpy = TestBed.inject(HttpClient);
//   spyOn(httpClientSpy, 'get').and.returnValue(of(mockMovies));
//     service.getMovies().subscribe((movie) => {
//       expect(movie).toEqual(mockMovies);
//       done();
//     });
 
    
//  });
})
