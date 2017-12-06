import { Injectable } from '@angular/core';
import { FoodCalendarDay, FoodMenuSection } from '../foodcalendar/foodcalendarday';

@Injectable()
export class StorageService {

    private readonly storageName: string = 'FOOD_CALENDAR_STORAGE';
    
    storeFood(food: string, where: string, day: Date) {
        const foodDay = this.getFood(day);
        const section = foodDay.sections.find(s => s.section === where);
        if (!!section) {
            section.food.push(food);
        } else {
            foodDay.sections.push(new FoodMenuSection(where, [food]));
        }
        this.storeFoodDay(foodDay);
    }

    getFood(day: Date): FoodCalendarDay {
        return this.getFoodDataForDay(day) || new FoodCalendarDay(day, []);
    }

    private storeFoodDay(foodDay: FoodCalendarDay) {
        const findFoodDay = (fcd) => fcd.day.toDateString() === foodDay.day.toDateString();
        const filterOutFoodDay = (fcd) => !findFoodDay(fcd);
        let foodData: FoodCalendarDay[] = this.getFoodData();
        if (!!foodData.find(findFoodDay)) {
            foodData = foodData.filter(filterOutFoodDay);            
        }
        foodData.push(foodDay);
        localStorage.setItem(this.storageName, JSON.stringify(foodData));
    }

    private getFoodDataForDay(day: Date): FoodCalendarDay {
        return this.getFoodData().find(fc => fc.day.toDateString() === day.toDateString());
    }

    private getFoodData(): FoodCalendarDay[] {
        return JSON.parse(localStorage.getItem(this.storageName) || '[]').map(FoodCalendarDay.fromJson);
    }

}



