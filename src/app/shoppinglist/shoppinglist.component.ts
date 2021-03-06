import { Component } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-shoppinglist',
    templateUrl: 'shoppinglist.html',
    styleUrls: ['shoppinglist.scss']
})
export class ShoppingListComponent {

    opened = false;

    usePrintableClass = false;

    shoppingItems: string[] = [];

    constructor(private storage: StorageService) {}

    openShoppingList() {
        this.shoppingItems = _.chain(this.storage.getFoodForShoppingList())
            .flatMap(fc => fc.sections)
            .flatMap(section => section.food)
            .uniq()
            .value();        
        this.opened = true;
    }

    printableVersion() {
        this.usePrintableClass = true;
    }

    closeShoppingList() {
        this.opened = false;
        this.usePrintableClass = false;
    }

    removeFromShoppingList(item: string) {
        this.shoppingItems = this.shoppingItems.filter(s => s !== item);
    }
}
