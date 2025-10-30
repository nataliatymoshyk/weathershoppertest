import {test, expect} from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {ShopFrame} from "../pages/shopFrame";

test('Add spf 50 and spf-30 to the card and open it', async ({page}) => {
    let mainPage = new MainPage(page);
    let shopFrame = new ShopFrame(page);
    await mainPage.openMainPage();
    await mainPage.clickBuySunscreens()
        .then(shopFrame => shopFrame.chooseCheapestSunScreenWithSPF(50))
        .then(shopFrame => shopFrame.chooseCheapestSunScreenWithSPF(30))
        .then(shopFrame => shopFrame.openCart());

});


