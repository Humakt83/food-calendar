import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FoodCalendarDay, FoodMenuSection } from '../foodcalendar/foodcalendarday';
import { FoodSection } from '../foodcalendar/foodsection';
import { DateService } from '../week/date.service';

@Component({
    selector: 'app-daymenu',
    templateUrl: 'daymenu.html',
    styleUrls: ['daymenu.scss', '../dishes/dishes.scss']
})
export class DayMenuComponent {

    breakfasts: string[] = [];
    lunches: string[] = [];
    dinners: string[] = [];
    snacks: string[] = [];

    private selectedDay: Date;

    constructor(private storage: StorageService, private dateService: DateService) {
        this.dateService.selectedDate.subscribe(result => {
            const getFoodForSection = (section: FoodSection, sections: FoodMenuSection[]) => {
                return sections.map(s => s.section).includes(section) ? 
                    sections.filter(s => s.section === section)[0].food : [];
            };
            this.selectedDay = result;
            const foodSections = this.storage.getFood(result).sections;
            this.breakfasts = getFoodForSection(FoodSection.BREAKFAST, foodSections);
            this.lunches = getFoodForSection(FoodSection.LUNCH, foodSections);
            this.dinners = getFoodForSection(FoodSection.DINNER, foodSections);     
            this.snacks = getFoodForSection(FoodSection.SNACK, foodSections);
        });
    }

    dropBreakfast(event: DragEvent) {
        this.dropFood(event, FoodSection.BREAKFAST, this.breakfasts);
    }

    dropLunch(event: DragEvent) {
        this.dropFood(event, FoodSection.LUNCH, this.lunches);
    }

    dropDinner(event: DragEvent) {
        this.dropFood(event, FoodSection.DINNER, this.dinners);
    }

    dropSnack(event: DragEvent) {
        this.dropFood(event, FoodSection.SNACK, this.snacks);
    }

    private dropFood(event: DragEvent, section: FoodSection, arrayToAdd: string[]) {
        const food: string = event.dataTransfer.getData('text/plain');
        arrayToAdd.push(food);
        this.storage.storeFood(food, section, this.selectedDay);
    }
}
