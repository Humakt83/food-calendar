import { Injectable } from '@angular/core';
import { FoodCalendarDay, FoodMenuSection } from '../foodcalendar/foodcalendarday';
import { FoodSection } from '../foodcalendar/foodsection';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class StorageService {

    private readonly storageName: string = 'FOOD_CALENDAR_STORAGE';
    
    storeFood(food: string, where: FoodSection, day: Date) {
        const foodDay = this.getFood(day);
        const section = foodDay.sections.find(s => FoodSection[s.section] === FoodSection[where]);
        if (section !== null && section !== undefined) {
            section.food.push(food);
        } else {
            foodDay.sections.push(new FoodMenuSection(where as FoodSection, [food]));
        }
        this.storeFoodDay(foodDay);
    }

    removeFood(food: string, where: FoodSection, day: Date) {
        const foodDay = this.getFood(day);
        const section = foodDay.sections.find(s => FoodSection[s.section] === FoodSection[where]);
        if (section !== null && section !== undefined) {
            _.remove(section.food, (f => f === food));
        }
        this.storeFoodDay(foodDay);
    }

    getFood(day: Date): FoodCalendarDay {
        return this.getFoodDataForDay(day) || new FoodCalendarDay(day, []);
    }

    getFoodForShoppingList(): FoodCalendarDay[] {
        const currentDate: moment.Moment = moment(new Date()).set('hour', 0).set('minute', 0).set('second', 0);
        return this.getFoodData().filter(fc => moment(fc.day).isSameOrAfter(currentDate));
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



