import { Component } from '@angular/core';

@Component({
    selector: 'app-dishes',
    templateUrl: 'dishes.html',
    styleUrls: ['dishes.scss']
})
export class DishesComponent {

    breakfasts = ['Weetabix', 'Kaurapuuro', 'Pekoni ja munat', 'Paistetut munat', 'Mysli'];

    onDragStart(event: DragEvent, dish: string) {
        console.log(dish);
        event.dataTransfer.setData('text/plain', dish);
    }
}
