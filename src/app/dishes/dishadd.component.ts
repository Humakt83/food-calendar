import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DishType } from '../foodcalendar/dishtype';

@Component({
    selector: 'app-dishadd',
    templateUrl: 'dishadd.html',
    styleUrls: ['dishadd.scss']
})
export class DishAddComponent implements OnInit {

    dishAddForm: FormGroup;

    dishType = DishType;

    showAddDishModal = false;

    ngOnInit() {
        this.dishAddForm = new FormGroup({
            name: new FormControl(),
            dish: new FormControl()
        });
    }

    openAddDishModal() {
        this.showAddDishModal = true;
    }

    addDish(event: Event) {
        event.preventDefault();
        console.log(this.dishAddForm.value);
    }

}
