import {test, expect} from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {afterEach} from "node:test";

test('Find cheapest aloe vera moisturizer', async ({page}) => {
    let mainPage = new MainPage(page);
    await mainPage.openMainPage();
    await mainPage.clickBuyMoisturizers()
        .then(moisturePage => moisturePage.chooseCheapestAloeVeraMoisturizer())
        .then(moisturePage => moisturePage.chooseCheapestAlmondVeraMoisturizer())
        .then(moisturePage => moisturePage.openCart());

    await page.pause();
});


