
import {MoisturePage} from "./moisturesPage";
import {SunscreenPage} from "./sunscreenPage";

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
  async buyProductsBasedOnTemperature(temperature,) {
    if (Number(temperature) < 19) {
      console.log("temperature is below 19 degrees");
      await this.clickBuyMoisturizers();
     // await moisturePage.isMoisturePageOpen();
    }
    if (Number(temperature) > 34) {
      console.log("temperature is above 34 degrees");
      await this.clickBuySunscreens();
    }

    if (Number(temperature) >= 19 && Number(temperature) <= 34) {
      //TODO add minus temperature check
      console.log('Temperature is between 19 and 34 degrees, no action taken');
    }

  }

  async clickBuyMoisturizers() {
    await this.page.getByRole('button', { name: 'Buy moisturizers' }).click();
    return new MoisturePage(this.page);
  }

  async clickBuySunscreens() {
    await this.page.getByRole('button', { name: 'Buy sunscreens' }).click();
    return new SunscreenPage(this.page);
  }
}
