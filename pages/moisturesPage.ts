import {expect} from '@playwright/test';
import  {ShopFrame} from "./shopFrame";

export class MoisturePage {
    readonly page;

    constructor(page) {
        this.page = page;

    }

    async isMoisturePageOpen() {
        // await expect(this.page).toHaveURL(/.*moisturizers/);
        await expect(this.page).toHaveTitle('The Best Moisturizers in the World!');
        console.log("Moisturizers page is opened");
    }

}
