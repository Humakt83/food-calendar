import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DateService } from './week/date.service';
import { DayMenuComponent } from './daymenu/daymenu.component';
import { DishAddComponent } from './dishes/dishadd.component';
import { DishesComponent } from './dishes/dishes.component';
import { DishesService } from './dishes/dishes.service';
import { DishesFilterComponent } from './dishes/dishesfilter.component';
import { DishesFilterPipe } from './dishes/dishesfilter.pipe';
import { ShoppingListComponent } from './shoppinglist/shoppinglist.component';
import { StorageService } from './storage/storage.service';
import { WebStorageService } from './storage/webstorage.service';
import { WeekComponent } from './week/week.component';

@NgModule({
    declarations: [
        AppComponent,
        WeekComponent,
        DishesComponent,
        DayMenuComponent,
        ShoppingListComponent,
        DishAddComponent,
        DishesFilterComponent,
        DishesFilterPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        StorageService,
        DateService,
        DishesService,
        WebStorageService],
    bootstrap: [AppComponent],
})
export class AppModule { }
