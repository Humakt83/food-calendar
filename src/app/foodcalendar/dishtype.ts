export enum DishType {
    MEAL, BREAKFAST, DESSERT, SNACK
}

export namespace DishType {

    export function dishTypes(): DishType[] {
        return [DishType.BREAKFAST, DishType.MEAL, DishType.DESSERT, DishType.SNACK];
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
        }
    }
}
