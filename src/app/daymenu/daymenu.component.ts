import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { FoodCalendarDay, FoodMenuSection } from '../foodcalendar/foodcalendarday';
import { FoodSection } from '../foodcalendar/foodsection';
import { DateService } from '../week/date.service';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-daymenu',
    templateUrl: 'daymenu.html',
    styleUrls: ['daymenu.scss', '../dishes/dishes.scss', '../shoppinglist/shoppinglist.scss']
})
export class DayMenuComponent implements OnInit, OnDestroy {

    breakfasts: string[] = [];
    lunches: string[] = [];
    dinners: string[] = [];
    snacks: string[] = [];

    private selectedDay: Date;
    private subscription: Subscription;

    constructor(private storage: StorageService, private dateService: DateService) {
    }

    ngOnInit() {
        this.subscription = this.dateService.selectedDate.subscribe(result => {
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
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

    removeBreakfast(food: string) {
        this.removeFood(FoodSection.BREAKFAST, this.breakfasts, food);
    }

    removeLunch(food: string) {
        this.removeFood(FoodSection.LUNCH, this.lunches, food);
    }

    removeDinner(food: string) {
        this.removeFood(FoodSection.DINNER, this.dinners, food);
    }

    removeSnack(food: string) {
        this.removeFood(FoodSection.SNACK, this.snacks, food);
    }

    private removeFood(section: FoodSection, arrayToRemove: string[], food: string) {
        _.remove(arrayToRemove, (f => f === food));
        this.storage.removeFood(food, section, this.selectedDay);
    }

    private dropFood(event: DragEvent, section: FoodSection, arrayToAdd: string[]) {
        const food: string = event.dataTransfer.getData('food');
        if (!food) { 
            return; 
        }
        arrayToAdd.push(food);
        this.storage.storeFood(food, section, this.selectedDay);
    }
}
