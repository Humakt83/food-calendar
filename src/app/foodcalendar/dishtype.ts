export enum DishType {
    MEAL, BREAKFAST, DESSERT, SNACK, SOUP
}

export namespace DishType {

    export function dishTypes(): DishType[] {
        return [DishType.BREAKFAST, DishType.MEAL, DishType.DESSERT, DishType.SNACK, DishType.SOUP];
    }

    export function translateDishType(dishType: DishType): string {
        switch (dishType) {
            case DishType.MEAL:
                return 'Pääruoat';
            case DishType.BREAKFAST:
                return 'Aamupalat';
            case DishType.SNACK:
                return 'Välipalat';
            case DishType.DESSERT:
                return 'Jälkiruoat';
            case DishType.SOUP:
                return 'Keitot';
        }
    }
}
