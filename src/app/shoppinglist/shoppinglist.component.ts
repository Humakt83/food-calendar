import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';

@Component({
    selector: 'app-shoppinglist',
    templateUrl: 'shoppinglist.html',
    styleUrls: ['shoppinglist.scss']
})
export class ShoppingListComponent {

    opened = false;

    constructor(private storage: StorageService) {}

    openShoppingList() {
        console.log(this.storage.getFoodForShoppingList());
    }
}
