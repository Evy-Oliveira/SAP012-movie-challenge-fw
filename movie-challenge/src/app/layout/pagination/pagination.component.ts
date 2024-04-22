import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  @Input() currentPage:number = 0;
  @Input() totalPages: number = 0;
  @Output() onSelectPage: EventEmitter<number> = new EventEmitter<number>();

  get totalPagesArray(): number[]{
    return Array.from({length:this.totalPages}, (_, index) => index + 1);
  }

  selectPage(page: number){
    this.onSelectPage.emit(page)
  }
  isPageActive(page:number): boolean{
    return this.currentPage === page;
  }
  isPreviousDisabled(): boolean{
    return this.currentPage === 1;
  }
  isNextDisabled(): boolean{
    return this.currentPage === this.totalPages;
  }
}
