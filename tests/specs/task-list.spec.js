import { test, expect } from '@playwright/test'
import { TaskList } from '../pages/task-list-page.js'

test.beforeEach(async ({ page }) => {
    await page.goto('https://ni3pandharpatte.github.io/react-pw-js-to-do-app/');
    await page.waitForLoadState('networkidle');
})

test('verify duplicate tasks are allowed', async function ({ page }) {
    const taskList = new TaskList(page);
    const count = await taskList.getTaskCountByTaskText('aaa');
    expect(count).toBeGreaterThan(1)
})

test('verify delete functionality', async function ({ page }) {
    const taskList = new TaskList(page);
    const countBeforeTaskAdd = await taskList.getTotalTasksCount();
    await taskList.deleteTaskByText('New Task 001');
    const countAfterTaskAdd = await taskList.getTotalTasksCount();
    expect(countAfterTaskAdd).toBe(countBeforeTaskAdd - 1);
})

test('verify css properties of done button', async function ({ page }) {
    const taskList = new TaskList(page);
    const cssValue = await taskList.getCssValues('bbb', 'Done Button', 'background-color');
    expect(cssValue).toEqual('#4caf50');
})

test('print total task counts', async function ({ page }) {
    const taskList = new TaskList(page);
    const totalTasksCount = await taskList.getTotalTasksCount();
    console.log(totalTasksCount);
})