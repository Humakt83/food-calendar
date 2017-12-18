import { AppPage } from './app.po';

describe('food-calendar App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
        page.navigateTo();
    });

    it('contains four categories of dishes', () => {
        expect(page.getDishes().get(0).getText()).toEqual('Aamupalat');
        expect(page.getDishes().get(1).getText()).toEqual('Pääruoat');
        expect(page.getDishes().get(2).getText()).toEqual('Jälkiruoat');
        expect(page.getDishes().get(3).getText()).toEqual('Välipalat');    
    });
});
