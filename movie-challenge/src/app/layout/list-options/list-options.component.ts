import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Option } from 'src/models/option';


@Component({
  selector: 'app-list-options',
  templateUrl: './list-options.component.html',
  styleUrls: ['./list-options.component.css']
})
export class ListOptionsComponent {
@Input() options!: Option[];
@Input() selectedOption: Option | null = null;
@Output() onChange: EventEmitter<Option> = new EventEmitter<Option>();
@Output() onClear: EventEmitter<void>  = new EventEmitter<void>();

handleChange(event:string) {
  const option:any = this.options.find(op => op.value === event);
  console.log(option); 
  this.onChange.emit(option);
}
handleClear(){
  this.selectedOption = null;
  this.onClear.emit();
}

}
