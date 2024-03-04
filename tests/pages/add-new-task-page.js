import { Abstract } from "./abstract";

const SELECTORS = {
    taskInput: 'Enter task...',
    addButton: '[class="btn-task"]'
}

export class AddNewTask extends Abstract {
    constructor(page) {
        super(page);
        this.page = page;

        this.taskInput = page.getByPlaceholder(SELECTORS.taskInput);
        this.addButton = page.locator(SELECTORS.addButton);
    }

    getLocatorByName(locatorName) {
        const LOCATOR_MAP = {
        }
        return LOCATOR_MAP[locatorName];
    }

    async addNewTask(taskDetails){
        await this.enterTaskDetails(taskDetails);
        await this.clickAddButton();
    }

    async enterTaskDetails(taskDetails) {
        await this.taskInput.fill(taskDetails);
    }

    async clickAddButton() {
        await this.addButton.click();
        await this.page.waitForTimeout(2000);
    }
}
