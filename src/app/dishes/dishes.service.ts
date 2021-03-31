import { Injectable } from '@angular/core';
import { WebStorageService } from '../storage/webstorage.service';
import { DishType } from '../foodcalendar/dishtype';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import { zip } from 'rxjs';
import * as _ from 'lodash';

@Injectable()
export class DishesService {

    private breakfasts = new BehaviorSubject<string[]>(['Weetabix', 'Kaurapuuro', 'Pekoni ja munat', 'Paistetut munat', 'Mysli'
        , 'Maissihiutaleet', 'Riisimurot', 'Paahtoleipä']);
    private meals = new BehaviorSubject<string[]>(['Lihapullat', 'Pasta bolognese', 'Pizza', 
        'Pasta carbonara', 'Nakit', 'Lihamakaronilaatikko', 'Maksalaatikko', 'Pinaattiohukaiset', 'Pihvi',
        'Kanawokki', 'Hampurilainen', 'Perunamuussi', 'Ranskalaiset', 'Riisi', 'Kalapuikot', 'Perunat', 'Pasta', 'Nuudeli']);
    private desserts = new BehaviorSubject<string[]>(['Jäätelö', 'Mustikkapiirakka', 'Pulla', 'Kakku']);
    private snacks = new BehaviorSubject<string[]>(['Jogurtti', 'Raejuusto', 'Banaani', 'Omena', 'Keksi', 'Sämpylä', 'Mandariini',
        'Rahka', 'Kinkkuleipä', 'Meetwurstileipä']);
    private soups = new BehaviorSubject<string[]>(['Hernekeitto', 'Siskonmakkarakeitto', 'Porkkanakeitto', 'Nakkikeitto', 
        'Jauhelihakeitto', 'Kasviskeitto']);
    private drinks = new BehaviorSubject<string[]>(['Maito', 'Kahvi', 'Omenamehu', 'Appelsiinimehu', 'Olut', 'Punaviini', 
        'Valkoviini', 'Tee', 'Vesi']);
    
    private dishesFilter = new BehaviorSubject<string>('');

    constructor(private storage: WebStorageService) {
        Observable.zip(this.breakfasts, this.storage.getFoodForSection(DishType.BREAKFAST))
            .next(_.uniq(this.breakfasts.getValue()));
        zip(this.meals, this.storage.getFoodForSection(DishType.MEAL))
            .next(_.uniq(this.breakfasts.getValue()));
        zip(this.desserts, this.storage.getFoodForSection(DishType.DESSERT))
            .next(_.uniq(this.breakfasts.getValue()));
        zip(this.snacks, this.storage.getFoodForSection(DishType.SNACK))
            .next(_.uniq(this.breakfasts.getValue()));
        zip(this.soups, this.storage.getFoodForSection(DishType.SOUP))
            .next(_.uniq(this.breakfasts.getValue()));
        zip(this.drinks, this.storage.getFoodForSection(DishType.DRINK))
            .next(_.uniq(this.breakfasts.getValue()));
    }

    getBreakfasts(): Observable<string[]> {
        return this.breakfasts;
    }

    getMeals(): Observable<string[]> {
        return this.meals;
    }

    getDesserts(): Observable<string[]> {
        return this.desserts;
    }

    getSnacks(): Observable<string[]> {
        return this.snacks;
    }

    getSoups(): Observable<string[]> {
        return this.soups;
    }

    getDrinks(): Observable<string[]> {
        return this.drinks;
    }

    addDish(dishType: DishType, food: string) {
        const dishSection = this.getDishesForDishType(dishType);
        const dishes = dishSection.getValue();
        if (_.includes(dishes, food)) {
            return;
        }
        dishes.push(food);
        dishSection.next(dishes);
        this.storage.addFoodToSection(food, dishType).subscribe((result) => {
            console.log(result);
        });
    }

    getFilter(): Observable<string> {
        return this.dishesFilter;
    }

    changeFilter(filter: string) {
        this.dishesFilter.next(filter);
    }

    private getDishesForDishType(dishType: DishType): BehaviorSubject<string[]> {
        switch (dishType) {
            case DishType.BREAKFAST:
                return this.breakfasts;
            case DishType.MEAL:
                return this.meals;
            case DishType.DESSERT:
                return this.desserts;
            case DishType.SNACK: 
                return this.snacks;
            case DishType.SOUP:
                return this.soups;
            case DishType.DRINK:
                return this.drinks;
        }
    }

}
