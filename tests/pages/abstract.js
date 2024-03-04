import rgbToHex from '../helper/rgb-to-hex.js'
export class Abstract {
    constructor(page) {
        this.page = page;
    }

    async getComputedStyle(elementLocator, cssProperty) {
        const cssValue = await elementLocator.evaluate(
            (el, property) => window.getComputedStyle(el).getPropertyValue(property),
            cssProperty
        );

        const indexRgb = cssValue.indexOf('rgb');
        // console.log(`cssValue: ${cssValue} - ${indexRgb}`)
        if (indexRgb < 0) return cssValue;

        //if cssValue has rgb then replace it with hex color
        const rgb = cssValue.substring(indexRgb, cssValue.indexOf(')') + 1);
        return cssValue.replace(/rgb\(.*\)/g, rgbToHex(rgb));
    }

    async getComputedStyles(elementLocator, cssProperties) {
        const allPropertyValues = {};
        await Promise.all(
            cssProperties.map(async (property) => {
                const value = await this.getComputedStyle(elementLocator, property);
                allPropertyValues[property] = value;
            })
        );

        return allPropertyValues;
    }
}