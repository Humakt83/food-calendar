import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { DishType } from '../foodcalendar/dishtype';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DishesService {

    private breakfasts = new BehaviorSubject<string[]>(['Weetabix', 'Kaurapuuro', 'Pekoni ja munat', 'Paistetut munat', 'Mysli']);
    private meals = new BehaviorSubject<string[]>(['Hernekeitto', 'Lihapullat ja perunamuussi', 'Pasta bolognese', 'Pizza', 
        'Pasta carbonara', 'Nakit ja ranskalaiset', 'Lihamakaronilaatikko', 'Maksalaatikko']);
    private desserts = new BehaviorSubject<string[]>(['Jäätelö', 'Mustikkapiirakka', 'Pulla', 'Kakku']);
    private snacks = new BehaviorSubject<string[]>(['Jogurtti', 'Raejuusto', 'Banaani', 'Omena', 'Keksi', 'Sämpylä']);

    constructor(private storage: StorageService) {
        this.breakfasts.next(this.breakfasts.getValue().concat(this.storage.getFoodForSection(DishType.BREAKFAST)));
        this.meals.next(this.meals.getValue().concat(this.storage.getFoodForSection(DishType.MEAL)));
        this.desserts.next(this.desserts.getValue().concat(this.storage.getFoodForSection(DishType.DESSERT)));
        this.snacks.next(this.snacks.getValue().concat(this.storage.getFoodForSection(DishType.SNACK)));
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

}
