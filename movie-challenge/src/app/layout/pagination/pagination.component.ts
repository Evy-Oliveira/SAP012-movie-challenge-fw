import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit{
  constructor(){
    this.updateTotalPagesArray();
  }

  @Input() currentPage:number = 0;
  @Input() totalPages: number = 0;
  @Output() onSelectPage: EventEmitter<number> = new EventEmitter<number>();
  totalPagesArray: number[] = [];

  ngOnInit(): void {
    // this.updateTotalPagesArray();
  }
  ngOnChanges(): void{
    this.updateTotalPagesArray();
  }
  updateTotalPagesArray(): void{
    this.totalPagesArray = Array.from({length:this.totalPages}, (_, index) => index + 1)
  }
  selectPage(page: number){
    this.onSelectPage.emit(page)
  }
  isPageActive(page:number): boolean{
    return this.currentPage === page;
  }
  isPreviousDisabled(): boolean{
    return this.currentPage <= 1;
  }
  isNextDisabled(): boolean{
    return this.currentPage >= this.totalPages;
  }
  trackByFn(index: number, item: number){
    return index;
  }
}
