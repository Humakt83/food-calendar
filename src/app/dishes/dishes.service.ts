import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { DishType } from '../foodcalendar/dishtype';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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

    constructor(private storage: StorageService) {
        this.breakfasts.next(_.uniq(this.breakfasts.getValue().concat(this.storage.getFoodForSection(DishType.BREAKFAST))));
        this.meals.next(_.uniq(this.meals.getValue().concat(this.storage.getFoodForSection(DishType.MEAL))));
        this.desserts.next(_.uniq(this.desserts.getValue().concat(this.storage.getFoodForSection(DishType.DESSERT))));
        this.snacks.next(_.uniq(this.snacks.getValue().concat(this.storage.getFoodForSection(DishType.SNACK))));
        this.soups.next(_.uniq(this.soups.getValue()).concat(this.storage.getFoodForSection(DishType.SOUP)));
        this.drinks.next(_.uniq(this.drinks.getValue()).concat(this.storage.getFoodForSection(DishType.DRINK)));
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
        this.storage.addFoodToSection(food, dishType);
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
