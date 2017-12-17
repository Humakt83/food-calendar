import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { DishesComponent } from './dishes/dishes.component';
import { DayMenuComponent } from './daymenu/daymenu.component';
import { StorageService } from './storage/storage.service';
import { DateService } from './week/date.service';
import { ShoppingListComponent } from './shoppinglist/shoppinglist.component';
import { DishesService } from './dishes/dishes.service';
import { DishAddComponent } from './dishes/dishadd.component';

@NgModule({
    declarations: [
        AppComponent,
        WeekComponent,
        DishesComponent,
        DayMenuComponent,
        ShoppingListComponent,
        DishAddComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CalendarModule.forRoot()
    ],
    providers: [
        StorageService,
        DateService,
        DishesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
