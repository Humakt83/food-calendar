import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { DishesComponent } from './dishes/dishes.component';
import { DayMenuComponent } from './daymenu/daymenu.component';

@NgModule({
  declarations: [
    AppComponent, 
    WeekComponent,
    DishesComponent,
    DayMenuComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
      CalendarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
