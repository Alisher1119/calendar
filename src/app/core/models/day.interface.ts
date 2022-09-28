import {AppointmentInterface} from "./appointment.interface";

export interface DayInterface {
  date: Date;
  appointments?: AppointmentInterface[];
}
