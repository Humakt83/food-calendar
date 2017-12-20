import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dishfilter'
})
export class DishesFilterPipe implements PipeTransform {

    transform(dishes: string[], filter: string): string[] {
        if (!filter) {
            return dishes;
        }
        return dishes.filter(dish => dish.toLowerCase().includes(filter.toLowerCase()));
    }

}
