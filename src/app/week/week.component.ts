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
    dates: Date[] = [];

    readonly dayNames: string[] = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];

    constructor(private dateService: DateService) {
        this.generateDatesForWeek();
    }

    previousWeek() {
        this.viewDate = moment(this.viewDate).subtract(1, 'week').toDate();
        this.generateDatesForWeek();
        this.changeDate();
    }

    nextWeek() {
        this.viewDate = moment(this.viewDate).add(1, 'week').toDate();
        this.generateDatesForWeek();
        this.changeDate();
    }

    today() {
        this.viewDate = new Date();
        this.generateDatesForWeek();
        this.changeDate();
    }

    changeDay(day: Date) {
        this.viewDate = day;
        this.changeDate();
    }

    private changeDate() {        
        this.dateService.changeDate(this.viewDate);
    }

    private generateDatesForWeek() {
        this.dates = [];
        const startOfWeek = this.viewDate.getDay() === 0 
            ? moment(this.viewDate).subtract(6, 'days')
            : moment(this.viewDate).set('days', 1);
        for (let i = 0; i < 7; i++) {
            this.dates.push(moment(startOfWeek).add(i, 'days').toDate());
        }
    }


}
