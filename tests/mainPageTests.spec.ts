import { test, expect } from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {MoisturePage} from "../pages/moisturesPage";
import {SunscreenPage} from "../pages/sunscreenPage";
import {afterEach} from "node:test";


test('Buy moisturizers if temperature is below 19 degree or sunscreen if degree > 34', async ({ page }) => {
    let mainPage = new MainPage(page);
    await mainPage.openMainPage();
    let temperature = await mainPage.checkTemperature();


    if (Number(temperature) < 19) {
        console.log("temperature is below 19 degrees");
        await mainPage.clickBuyMoisturizers().then(moisturePage => moisturePage.isMoisturePageOpen());

    }
    if (Number(temperature) > 34) {
        console.log("temperature is above 34 degrees");
        await mainPage.clickBuySunscreens().then(sunscreenPage => sunscreenPage.isSunscreenPageOpen());

    }

    if (Number(temperature) >= 19 && Number(temperature) <= 34) {
        //TODO add minus temperature check
        console.log('Temperature is between 19 and 34 degrees, no action taken');
    }
})



