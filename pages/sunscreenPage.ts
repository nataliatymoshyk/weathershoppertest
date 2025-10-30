import {test, expect} from '@playwright/test';
export class SunscreenPage{
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async isSunscreenPageOpen() {
       // await expect(this.page).toHaveURL(/.*sunscreens/);
        await expect(this.page).toHaveTitle('The Best Sunscreens in the World!');
        console.log("Sunscreens page is opened");
    }
}
