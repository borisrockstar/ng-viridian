import { EventEmitter, Input, Output, Directive } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { of } from 'rxjs';

@Directive()
export abstract class DataGridTemplateComponent<T> {

  @Output() public itemsLoaded: EventEmitter<void>;
  @Output() public editItem: EventEmitter<T>;
  @Output() public deleteItem: EventEmitter<T>;

  @Input() public busy: boolean;
  public table: MatTable<T>;
  public tableColumns: string[];

  @Input() public set items(input: T[]) {
    if (this.table) {
      if (input) {
        this.table.dataSource = of(input);
      } else {
        this.table.dataSource = of([]);
      }
    }
  }

  constructor() {
    this.tableColumns = [];
    this.itemsLoaded = new EventEmitter();
    this.editItem = new EventEmitter();
    this.deleteItem = new EventEmitter();
    this.busy = false;
  }

  public onClickEdit(item: T) {
    if (this.editItem) {
      this.editItem.emit(item);
    }
  }

  public onClickDelete(item: T) {
    if (this.deleteItem) {
      this.deleteItem.emit(item);
    }
  }

}
