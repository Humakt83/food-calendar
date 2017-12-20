import { Component } from '@angular/core';
import { DishesService } from './dishes.service';

@Component({
    selector: 'app-dishesfilter',
    template: `
        <div class="dishesFilter">
            <label for="dishesFilter">Suodata ruokalajeja</label>
            <input name="dishesFilter" type="text" (change)="onFilterChange($event.target.value)">
        </div>
    `,
    styles: [`
        .dishesFilter {
            display: inline-block;
            float: left;     
        }
    `]
})
export class DishesFilterComponent {

    constructor(private dishesService: DishesService) {}

    onFilterChange(filter: string) {
        this.dishesService.changeFilter(filter);
    }

}