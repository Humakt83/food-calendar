export class FoodCalendarDay {
    constructor(public day: Date, public sections: FoodMenuSection[]) {}

    static fromJson(json: any): FoodCalendarDay {
        const sections = json.sections.map(FoodMenuSection.fromJson);
        return new FoodCalendarDay(new Date(Date.parse(json.day)), sections);
    }
}

export class FoodMenuSection {
    constructor(public section: string, public food: string[]) {}

    static fromJson(json: any): FoodMenuSection {
        return new FoodMenuSection(json.section, json.food);
    }
}
