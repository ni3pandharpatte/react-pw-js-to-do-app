import { test, expect } from '@playwright/test'

test('add new task', async function({page}){
    console.log('Jai Ganesh');
    await page.goto('https://ni3pandharpatte.github.io/react-pw-js-to-do-app/');
    const inputTask = page.getByPlaceholder('Enter task...');
    const buttonAdd = page.locator('[class="btn-task"]');
    const toastMessage = page.locator('[class="Toastify__toast-container Toastify__toast-container--top-right"]');

    expect(await inputTask.isVisible()).toBeTruthy();
    expect(await buttonAdd.isVisible()).toBeTruthy();
    await inputTask.fill('Jai Ganesh');
    await buttonAdd.click();
    await toastMessage.waitFor({state: 'visible'});
    expect(await toastMessage.isVisible()).toBeTruthy();
})