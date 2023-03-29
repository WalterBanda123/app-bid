import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  getCountDownTime(targetDate: string): string {
    const now = moment();
    const then = moment(targetDate);

    const countdownDuration = moment.duration(then.diff(now))

    const days = countdownDuration.days();
    const hours = countdownDuration.hours();
    const minutes = countdownDuration.minutes();
    const seconds = countdownDuration.seconds();

    return `${days} days : ${hours} hours: ${minutes} minutes: ${seconds} seconds`;
  }
}
