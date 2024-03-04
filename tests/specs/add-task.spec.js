import { test, expect } from '@playwright/test'
import { AddNewTask } from '../pages/add-new-task-page.js'
import { TaskList } from '../pages/task-list-page.js'

test.beforeEach(async ({ page }) => {
    await page.goto('https://ni3pandharpatte.github.io/react-pw-js-to-do-app/');
    await page.waitForLoadState('networkidle');
})

test('add and delete task', async function ({ page }) {
    console.log('Jai Ganesh');
    const addNewTask = new AddNewTask(page);
    const taskList = new TaskList(page);

    // Create Task
    let taskCountBeforeTaskAdd = await taskList.getTotalTasksCount();
    await addNewTask.addNewTask('New Task 001');
    let taskCountAfterTaskAdd = await taskList.getTotalTasksCount();
    expect(taskCountAfterTaskAdd).toBe(taskCountBeforeTaskAdd+1);

    // Delete Task
    taskCountBeforeTaskAdd = await taskList.getTotalTasksCount();
    await taskList.deleteTaskByText('New Task 001');
    taskCountAfterTaskAdd = await taskList.getTotalTasksCount();
    expect(taskCountAfterTaskAdd).toBe(taskCountBeforeTaskAdd - 1);
})