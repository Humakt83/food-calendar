import { Component } from '@angular/core';

@Component({
    selector: 'app-dishes',
    templateUrl: 'dishes.html',
    styleUrls: ['dishes.scss']
})
export class DishesComponent {

    breakfasts = ['Weetabix', 'Kaurapuuro', 'Pekoni ja munat', 'Paistetut munat', 'Mysli'];
    meals = ['Hernekeitto', 'Lihapullat ja perunamuussi', 'Pasta bolognese', 'Pizza', 'Pasta carbonara', 
        'Nakit ja ranskalaiset', 'Lihamakaronilaatikko', 'Maksalaatikko'];
    desserts = ['Jäätelö', 'Mustikkapiirakka', 'Pulla', 'Kakku'];
    snacks = ['Jogurtti', 'Raejuusto', 'Banaani', 'Omena', 'Keksi', 'Sämpylä'];


    onDragStart(event: DragEvent, dish: string) {
        event.dataTransfer.setData('food', dish);
    }
}
