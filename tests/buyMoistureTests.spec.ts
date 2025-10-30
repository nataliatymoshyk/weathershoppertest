import {test, expect} from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {afterEach} from "node:test";
import {ShopFrame} from "../pages/shopFrame";

test('Find cheapest aloe vera moisturizer, almond mosturizer and opend the cart', async ({page}) => {
    let mainPage = new MainPage(page);
    let shopFrame = new ShopFrame(page);
    await mainPage.openMainPage();
    await mainPage.clickBuyMoisturizers()
        .then(shopFrame => shopFrame.chooseCheapestMoisturizeWith('aloe'))
        .then(shopFrame => shopFrame.chooseCheapestMoisturizeWith('almond'));
    await shopFrame.openCart();

});


