import { FoodSection } from './foodsection';
import { DishType } from './dishtype';

export class FoodCalendarDay {
    constructor(public day: Date, public sections: FoodMenuSection[]) {}

    static fromJson(json: any): FoodCalendarDay {
        const sections = json.sections.map(FoodMenuSection.fromJson);
        return new FoodCalendarDay(new Date(Date.parse(json.day)), sections);
    }
}

export class FoodMenuSection {
    constructor(public section: FoodSection, public food: string[]) {}

    static fromJson(json: any): FoodMenuSection {
        return new FoodMenuSection(json.section as FoodSection, json.food);
    }
}

export class FoodDishSection {
    constructor(public section: DishType, public food: string[]) {}

    static fromJson(json: any): FoodDishSection {
        return new FoodDishSection(json.section as DishType, json.food);
    }
}
