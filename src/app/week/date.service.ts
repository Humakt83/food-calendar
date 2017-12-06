import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DateService {

    selectedDate: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());

    changeDate(date: Date) {
        this.selectedDate.next(date);
    }

}
