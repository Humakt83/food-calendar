import { Component } from '@angular/core';

@Component({
    selector: 'app-daymenu',
    templateUrl: 'daymenu.html',
    styleUrls: ['daymenu.scss', '../dishes/dishes.scss']
})
export class DayMenuComponent {

    breakfasts: string[] = [];

    dropBreakfast(event: DragEvent) {
        this.breakfasts.push(event.dataTransfer.getData('text/plain'));
    }
}
