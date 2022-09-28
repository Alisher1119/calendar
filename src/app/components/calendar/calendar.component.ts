import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {$e, $v} from "@angular/compiler/src/chars";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  selected: Date | null;
  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();
  constructor() {
    this.selected = new Date();
  }

  ngOnInit(): void {

  }

  onChange($event: Date) {
    this.change.emit($event);
  }

}
