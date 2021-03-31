import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { FoodCalendarDay, FoodMenuSection, FoodDishSection } from '../foodcalendar/foodcalendarday';
import { FoodSection } from '../foodcalendar/foodsection';
import { DishType } from '../foodcalendar/dishtype';
import * as moment from 'moment';
import * as _ from 'lodash';

@Injectable()
export class WebStorageService {

  BASE_HREF = 'http://localhost:3000/api';
  DISH_URL = this.BASE_HREF + '/dish';

  constructor(private http: HttpClient) {}
    
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
      const currentDate: moment.Moment = moment(new Date()).set('hours', 0);
      return this.getFoodData().filter(fc => moment(fc.day).isSameOrAfter(currentDate, 'hour'));
  }

  addFoodToSection(food: string, section: DishType): Observable<any> {
    return this.http.post<any>(this.DISH_URL, {name: food, dishtype: DishType[section].toString()});
  }

  getFoodForSection(section: DishType): Observable<string[]> {
    return this.http.get<string[]>(`${this.DISH_URL}/${DishType[section].toString()}`);
  }

  private storeFoodDay(foodDay: FoodCalendarDay) {
      const findFoodDay = (fcd) => fcd.day.toDateString() === foodDay.day.toDateString();
      const filterOutFoodDay = (fcd) => !findFoodDay(fcd);
      let foodData: FoodCalendarDay[] = this.getFoodData();
      if (!!foodData.find(findFoodDay)) {
          foodData = foodData.filter(filterOutFoodDay);            
      }
      foodData.push(foodDay);
  }

  private getFoodDataForDay(day: Date): FoodCalendarDay {
      return this.getFoodData().find(fc => fc.day.toDateString() === day.toDateString());
  }

  private getFoodData(): FoodCalendarDay[] {
      return []; // JSON.parse(localStorage.getItem(this.storageName) || '[]').map(FoodCalendarDay.fromJson);
  }

}



