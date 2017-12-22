import { Component, OnInit, OnDestroy } from '@angular/core';
import { DishesService } from './dishes.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-dishes',
    templateUrl: 'dishes.html',
    styleUrls: ['dishes.scss']
})
export class DishesComponent implements OnInit, OnDestroy {

    breakfasts = [];
    meals = [];
    drinks = [];
    soups = [];
    desserts = [];
    snacks = [];
    filter: string;

    private subscriptions: Subscription[] = [];

    constructor(private dishesService: DishesService) {
    }

    ngOnInit() {
        this.subscriptions.push(this.dishesService.getBreakfasts().subscribe(result => this.breakfasts = result));
        this.subscriptions.push(this.dishesService.getMeals().subscribe(result => this.meals = result));
        this.subscriptions.push(this.dishesService.getDesserts().subscribe(result => this.desserts = result));
        this.subscriptions.push(this.dishesService.getSnacks().subscribe(result => this.snacks = result));
        this.subscriptions.push(this.dishesService.getSoups().subscribe(result => this.soups = result));
        this.subscriptions.push(this.dishesService.getFilter().subscribe(result => this.filter = result));
        this.subscriptions.push(this.dishesService.getDrinks().subscribe(result => this.drinks = result));
    }

    ngOnDestroy() {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    onDragStart(event: DragEvent, dish: string) {
        event.dataTransfer.setData('food', dish);
    }
}
