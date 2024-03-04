import { Abstract } from "./abstract";

const SELECTORS = {
    toastMessageContainer: '[class="Toastify__toast-container Toastify__toast-container--top-right"]',
}

export class ToastMessage extends Abstract {
    constructor(page) {
        super(page);
        this.page = page;
        this.toastMessageContainer = page.locator(SELECTORS.toastMessageContainer);
    }

    getLocatorByName(locatorName) {
        const LOCATOR_MAP = {
        }
        return LOCATOR_MAP[locatorName];
    }

    async getToastMessageText() {
        await this.toastMessageContainer.waitFor({state: 'visible'});
        return this.toastMessageContainer.textContent()
    }
}
