import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { FoodCalendarDay, FoodMenuSection, FoodDishSection } from '../foodcalendar/foodcalendarday';
import { FoodSection } from '../foodcalendar/foodsection';
import { DishType } from '../foodcalendar/dishtype';
import * as moment from 'moment';
import * as _ from 'lodash';
import { map } from 'rxjs/operators';

@Injectable()
export class WebStorageService {

  BASE_HREF = 'http://localhost:3000/api';
  DISH_URL = this.BASE_HREF + '/dish';
  FOOD_CALENDAR_URL = this.BASE_HREF + '/food-calendar-day';

  constructor(private http: HttpClient) {}
    
  storeFood(food: string, where: FoodSection, day: Date): Observable<any> {
    const foodCalendarDate = {
        date: day,
        sections: [{
            section: FoodSection[where].toString(),
            dishes: [food],
        }]
    };
    return this.http.post<any>(this.FOOD_CALENDAR_URL, foodCalendarDate);
  }

  removeFood(food: string, where: FoodSection, day: Date): Observable<any> {
    const dayString = this.formatDateString(day);
    return this.http.delete(`${this.FOOD_CALENDAR_URL}/section/${FoodSection[where].toString()}/dish/${food}/${dayString}`);
  }

  getFood(day: Date): Observable<FoodCalendarDay> {
      const foodSections = [FoodSection.BREAKFAST, FoodSection.LUNCH, FoodSection.DINNER, FoodSection.SNACK];
      const dayString = this.formatDateString(day);
      return this.http.get<any>(`${this.FOOD_CALENDAR_URL}/${dayString}`)
        .pipe(map(result => {            
            const sections: FoodMenuSection[] = foodSections.map(section => {
                const sectionResult = result[FoodSection[section].toString()] || [];
                return new FoodMenuSection(section, sectionResult.map(res => res.name));
            });
            return new FoodCalendarDay(day, sections);
        }));    
  }

  getFoodForShoppingList(): FoodCalendarDay[] {
      const currentDate: moment.Moment = moment(new Date()).set('hours', 0);
      return this.getFoodData().filter(fc => moment(fc.day).isSameOrAfter(currentDate, 'hour'));
  }

  addFoodToSection(food: string, section: DishType): Observable<any> {
    return this.http.post<any>(this.DISH_URL, {name: food, dishtype: DishType[section].toString()});
  }

  getFoodForSection(section: DishType): Observable<string[]> {
    return this.http.get<[{id: number, name: string, dishtype: DishType}]>(`${this.DISH_URL}/${DishType[section].toString()}`)
        .pipe(map(result => result.map(resObj => resObj.name)));
  }

  private getFoodData(): FoodCalendarDay[] {
      return []; // JSON.parse(localStorage.getItem(this.storageName) || '[]').map(FoodCalendarDay.fromJson);
  }

  private formatDateString(day: Date): string {
    return moment(day).format('YYYY-MM-DD');
  }

}



