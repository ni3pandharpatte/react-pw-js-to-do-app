import { Abstract } from "./abstract";

const SELECTORS = {
    taskContainer: '[class="tasks"]',
    taskRow: '[class="task"]',
}

export class TaskList extends Abstract {
    constructor(page) {
        super(page);
        this.page = page;
        this.taskContainer = page.locator(SELECTORS.taskContainer);
        this.taskRow = page.locator(SELECTORS.taskRow);
    }

    getLocatorByName(locatorName) {
        const LOCATOR_MAP = {
            'Delete Button': 'deleteButton',
            'Done Button': 'doneButton',
            'Edit Button': 'editButton'
        }
        return LOCATOR_MAP[locatorName];
    }

    async getAllTaskRows() {
        await this.taskRow.last().waitFor({ state: 'visible' });
        const allRows = await this.taskRow.all();

        const allTaskRows = await Promise.all(allRows.map(async (taskRow) => {
            return {
                checkMark: taskRow.locator('[class="checked"]'),
                deleteButton: taskRow.locator('[class="btn-delete"]'),
                doneButton: taskRow.locator('[class="btn-done"]'),
                editButton: taskRow.locator('[class="btn-edit"]'),
                taskRowLocator: taskRow,
                text: await taskRow?.locator('span').textContent(),
                textSpan: taskRow?.locator('[class="none"]'),
            }
        }));

        return allTaskRows;
    }

    async getRowsByTaskText(taskText) {
        const allTaskRows = await this.getAllTaskRows();
        return allTaskRows.filter((taskRow) => taskRow.text === taskText);
    }

    async doneTaskByText(taskText) {
        const allFilteredTaskRows = await this.getRowsByTaskText(taskText);
        allFilteredTaskRows.map((taskRow) => (
            taskRow.doneButton.click()
        ))
    }

    async deleteTaskByText(taskText) {
        const allFilteredTaskRows = await this.getRowsByTaskText(taskText);
        allFilteredTaskRows.map((taskRow) => (
            taskRow.deleteButton.click()
        ))
        await this.page.waitForTimeout(2000);
    }

    async getTotalTasksCount() {
        const allTaskRows = await this.getAllTaskRows();
        return allTaskRows.length;
    }

    async getTaskCountByTaskText(taskText) {
        const allTaskRows = await this.getAllTaskRows();
        const allFilteredTaskRows = allTaskRows.filter((taskRow) => taskRow.text === taskText);
        return allFilteredTaskRows.length;
    }

    async getCssValues(taskText, elementName, property) {
        const allFilteredTaskRows = await this.getRowsByTaskText(taskText);
        const locator = this.getLocatorByName(elementName)
        const [value] = await Promise.all(allFilteredTaskRows.map(async (taskRow) => await this.getComputedStyle(taskRow[locator], property)));
        return value;
    }
}
