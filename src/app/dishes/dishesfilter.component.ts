import { Component } from '@angular/core';
import { DishesService } from './dishes.service';

@Component({
    selector: 'app-dishesfilter',
    templateUrl: 'dishesfilter.html',
    styles: [`
        .dishesFilter {
            display: inline-block;
            float: left;
            margin-left: 5%;    
        }
    `]
})
export class DishesFilterComponent {

    constructor(private dishesService: DishesService) {}

    onFilterChange(event: Event) {
        this.dishesService.changeFilter((<HTMLInputElement>event.target).value);
    }

}
