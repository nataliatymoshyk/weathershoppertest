import {test, expect} from '@playwright/test';
import {ShopFrame} from "./shopFrame";
export class SunscreenPage{
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async isSunscreenPageOpen() {
        await expect(this.page).toHaveTitle('The Best Sunscreens in the World!');
        console.log("Sunscreens page is opened");
    }

}
