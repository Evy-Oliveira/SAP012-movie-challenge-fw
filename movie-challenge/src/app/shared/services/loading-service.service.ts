import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoading$ =
  new BehaviorSubject<boolean>(false);


  get isLoadingObservable() {
    return this.isLoading$.asObservable();
  }
  

  startLoading(){
    this.isLoading$.next(true);
  }
  stopLoading(){
    this.isLoading$.next(false);
  }

}
