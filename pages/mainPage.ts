
import {MoisturePage} from "./moisturesPage";
import {SunscreenPage} from "./sunscreenPage";
import {ShopFrame} from "./shopFrame";

export class MainPage {
  readonly page;

  constructor(page) {
    this.page = page;
  }

  async openMainPage() {
    await this.page.goto('https://weathershopper.pythonanywhere.com/');
  }

  async checkTemperature() {
    const temperatureTextValue = await this.page.locator("#temperature").textContent();
    const temperature  = temperatureTextValue.match(/\d+/)?.[0];

    console.log('Temperature is ' + await temperature);
    return temperature;
  }
  async openCategoryPageBasedOnTemp(temperature,) {
    if (Number(temperature) < 19) {
      await this.clickBuyMoisturizers();
      let shopFrame = new ShopFrame(this.page);
      await shopFrame.isCategoryOpen("Moisturizers");

    }
    if (Number(temperature) > 34) {
      await this.clickBuySunscreens();
      let shopFrame = new ShopFrame(this.page);
      await shopFrame.isCategoryOpen("Sunscreens");


      if (Number(temperature) >= 19 && Number(temperature) <= 34) {
        console.log('Temperature is between 19 and 34 degrees, no action taken');
      }

      if (Number(temperature) < 0) {
        console.log("It's freezing outside, buy a jacket!");
      }
    }
  }

  async clickBuyMoisturizers() {
    await this.page.getByRole('button', { name: 'Buy moisturizers' }).click();
    return new ShopFrame(this.page);
  }

  async clickBuySunscreens() {
    await this.page.getByRole('button', { name: 'Buy sunscreens' }).click();
    return new ShopFrame(this.page);
  }
}
