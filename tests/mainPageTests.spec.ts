import { test, expect } from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {MoisturePage} from "../pages/moisturesPage";
import {SunscreenPage} from "../pages/sunscreenPage";
import {afterEach} from "node:test";
import {ShopFrame} from "../pages/shopFrame";


test('Buy moisturizers if temperature is below 19 degree or sunscreen if degree > 34', async ({ page }) => {
    let mainPage = new MainPage(page);
    let shopFrame = new ShopFrame(page);

    await mainPage.openMainPage();
    let temperature = await mainPage.checkTemperature();
    await mainPage.openCategoryPageBasedOnTemp(temperature);

})



