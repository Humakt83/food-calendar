import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FoodCalendarDay } from '../foodcalendar/foodcalendarday';
import { FoodSection } from '../foodcalendar/foodsection';
import { DateService } from '../week/date.service';

@Component({
    selector: 'app-daymenu',
    templateUrl: 'daymenu.html',
    styleUrls: ['daymenu.scss', '../dishes/dishes.scss']
})
export class DayMenuComponent {

    breakfasts: string[] = [];
    private selectedDay: Date;

    constructor(private storage: StorageService, private dateService: DateService) {
        this.dateService.selectedDate.subscribe(result => {
            this.selectedDay = result;
            const foodDay = this.storage.getFood(result);
            this.breakfasts = foodDay.sections.map(s => s.section).includes(FoodSection.BREAKFAST) ? 
                foodDay.sections.filter(s => s.section === FoodSection.BREAKFAST)[0].food : [];
        });
    }

    dropBreakfast(event: DragEvent) {
        const food: string = event.dataTransfer.getData('text/plain');
        this.breakfasts.push(food);
        this.storage.storeFood(food, FoodSection.BREAKFAST, this.selectedDay);
    }
}
