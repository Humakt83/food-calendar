import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DishType } from '../foodcalendar/dishtype';
import { DishesService } from './dishes.service';

@Component({
    selector: 'app-dishadd',
    templateUrl: 'dishadd.html',
    styleUrls: ['dishadd.scss']
})
export class DishAddComponent implements OnInit {

    dishAddForm: FormGroup;

    dishType = DishType;

    showAddDishModal = false;

    constructor(private dishesService: DishesService) {}

    ngOnInit() {
        this.dishAddForm = new FormGroup({
            name: new FormControl(),
            dish: new FormControl()
        });
    }

    openAddDishModal() {
        this.showAddDishModal = true;
    }

    closeAddDishModal() {
        this.showAddDishModal = false;
    }

    addDish(event: Event) {
        event.preventDefault();
        this.closeAddDishModal();
        const chosenDishType: DishType = Number.parseInt(this.dishAddForm.value.dish) as DishType;
        this.dishesService.addDish(chosenDishType, this.dishAddForm.value.name);
    }

}
