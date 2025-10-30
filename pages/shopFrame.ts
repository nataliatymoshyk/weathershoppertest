import {expect} from "@playwright/test";

export class ShopFrame {
    readonly page;

    constructor(page) {
        this.page = page;
    }

    async chooseCheapestSunScreenWithSPF(spf){
        let productsWithSPF = [];
        let shopFrame = new ShopFrame(this.page);
        productsWithSPF = await shopFrame.getListOfProductsByIngridient('SPF-'+spf);

        let cheapestProduct = await shopFrame.findCheapestProductInCategory(productsWithSPF);
        const elementToClick = await this.page.locator(`[onclick*="${cheapestProduct.element}"]`);
        await this.page.waitForTimeout(2000);
        await elementToClick.click();
        return this;
    }

    async chooseCheapestMoisturizeWith(ingridient) {
        let productsWithAloeVera = [];
        let shopFrame = new ShopFrame(this.page);
        productsWithAloeVera = await shopFrame.getListOfProductsByIngridient(ingridient);

        let cheapestProduct = await shopFrame.findCheapestProductInCategory(productsWithAloeVera);
        const elementToClick = await this.page.locator(`[onclick*="${cheapestProduct.element}"]`);
        await (expect(elementToClick).toBeVisible());
        await this.page.waitForTimeout(2000); //for some reason all implicit waits failed,
        //to do not waste of time I had to use short timeout
        await elementToClick.click();
        return this;
    }
    async getListOfProductsByIngridient(productIngredient){
        await this.page.waitForSelector('.btn.btn-primary');
        const productsElementHandles = await this.page.$$('.btn.btn-primary');
        const products = [];
        for (const product of productsElementHandles) {
            products.push(await product.getAttribute('onclick'));
        }
        return  products.filter(product => product.toLowerCase().includes(productIngredient.toLowerCase()));

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

    async openCart(){
        let cartButton  = await this.page.getByRole('button', { name: /Cart/ });
        await (expect(cartButton).toBeVisible());
        await cartButton.click();
        return this;
    }

    async isCategoryOpen(heading){
        const header = await this.page.getByRole('heading');
        await expect(header).toContainText(heading);
        return this;
    }
}
