import { browser, by, element } from 'protractor';

export class AppPage {

    navigateTo() {
        return browser.get('/');
    }

    getDishes() {
        return element.all(by.css('.dishes h3'));
    }
}
