import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-week',
    templateUrl: 'week.html',
    styleUrls: ['week.scss']
})
export class WeekComponent {

    viewDate: Date = new Date();

    previousWeek() {
        this.viewDate = moment(this.viewDate).subtract(1, 'week').toDate();
    }

    nextWeek() {
        this.viewDate = moment(this.viewDate).add(1, 'week').toDate();
    }

    today() {
        this.viewDate = new Date();
    }
}
