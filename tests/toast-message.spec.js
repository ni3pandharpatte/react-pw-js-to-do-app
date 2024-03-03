import { test, expect } from '@playwright/test'

test('add new task and verify toast message', async function({page}){
    await page.goto('https://ni3pandharpatte.github.io/react-pw-js-to-do-app/');
    const toastMessage = page.locator('[class="Toastify__toast-container Toastify__toast-container--top-right"]');
    await toastMessage.waitFor({state: 'visible'});
    expect(await toastMessage.isVisible()).toBeTruthy();
})