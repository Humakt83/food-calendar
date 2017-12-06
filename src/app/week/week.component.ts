import { Component } from '@angular/core';
import * as moment from 'moment';
import { DateService } from './date.service';

@Component({
    selector: 'app-week',
    templateUrl: 'week.html',
    styleUrls: ['week.scss']
})
export class WeekComponent {

    viewDate: Date = new Date();

    constructor(private dateService: DateService) {}

    previousWeek() {
        this.viewDate = moment(this.viewDate).subtract(1, 'week').toDate();
        this.changeDate();
    }

    nextWeek() {
        this.viewDate = moment(this.viewDate).add(1, 'week').toDate();
        this.changeDate();
    }

    today() {
        this.viewDate = new Date();
        this.changeDate();
    }

    private changeDate() {
        this.dateService.changeDate(this.viewDate);
    }


}
