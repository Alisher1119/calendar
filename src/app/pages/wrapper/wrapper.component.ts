import { Component, OnInit } from '@angular/core';
import {DayInterface} from "../../core/models/day.interface";
import * as moment from "moment"
import {AppointmentInterface} from "../../core/models/appointment.interface";

@Component({
  selector: 'wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  calendar: DayInterface[]
  selected: DayInterface;
  constructor() {
    this.calendar = [];
    this.selected = {
      date: new Date(),
      appointments: [],
    }
  }

  ngOnInit(): void {
  }

  onChange(date: Date) {
    const dateString = moment(date).format("dd.MM.yyyy");
    // @ts-ignore
    if (this.calendar[dateString]) {
      // @ts-ignore
      this.selected = this.calendar[dateString];
    } else {
      this.selected = {
        date: date,
        appointments: [],
      }
    }
  }

  updateAppointments(appointments: AppointmentInterface[]) {
    const dateString = moment(this.selected.date).format("dd.MM.yyyy");
    this.selected.appointments = appointments;
    // @ts-ignore
    this.calendar[dateString] = this.selected;
  }

}
