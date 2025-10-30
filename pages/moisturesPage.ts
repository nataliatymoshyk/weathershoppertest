import {test, expect} from '@playwright/test';

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

    async chooseCheapestAloeVeraMoisturizer() {
        let productsWithAloeVera = [];
        productsWithAloeVera = await this.getListOfProductsByIngridient('aloe');

        let cheapestProduct = await this.findCheapestProductInCategory(productsWithAloeVera);
        const elementToClick = await this.page.locator(`[onclick*="${cheapestProduct.element}"]`);
        await this.page.waitForTimeout(10000);
        await elementToClick.click();
        return this;
    }

    async chooseCheapestAlmondVeraMoisturizer() {
        let productsWithAloeVera = [];
        productsWithAloeVera = await this.getListOfProductsByIngridient('almond');

        let cheapestProduct = await this.findCheapestProductInCategory(productsWithAloeVera);
        const elementToClick = await this.page.locator(`[onclick*="${cheapestProduct.element}"]`);
        await this.page.waitForTimeout(1000);
        await elementToClick.click();
        return this;
    }

    async openCart(){
        let cartButton  = await this.page.getByRole('button', { name: /Cart/ });
        await (expect(cartButton).toBeVisible());
        await cartButton.click();
        return this;
    }
    async getListOfProductsByIngridient(productIngredient){
        await this.page.waitForSelector('.btn.btn-primary');
        const productsElementHandles = await this.page.$$('.btn.btn-primary');
        const products = [];
        for (const product of productsElementHandles) {
            products.push(await product.getAttribute('onclick'));
        }
      return  products.filter(product => product.toLowerCase().includes(productIngredient));

    }
    async findCheapestProductInCategory(productList){
        const regex = /addToCart\('(.+)',(\d+)\)/;
        const sortedProducts: { element: any, price: number }[] = [];

        productList.forEach(productList => {
            const match = productList.match(regex);
            sortedProducts.push({element: match[1], price: Number(match[2])});
        });

         sortedProducts.sort((a, b) => a.price - b.price);
         return sortedProducts[0];

    }
}
