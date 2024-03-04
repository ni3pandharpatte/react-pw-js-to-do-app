import { test, expect } from '@playwright/test'
import { ToastMessage } from '../pages/toast-message-page';

test.beforeEach(async ({ page }) => {
    await page.goto('https://ni3pandharpatte.github.io/react-pw-js-to-do-app/');
    await page.waitForLoadState('networkidle');
})

test('verify initial toast message', async function({page}){
    const toastMessage = new ToastMessage(page);
    const messageText = await toastMessage.getToastMessageText();
    expect(messageText).toContain('TODO List resolved 👌')
})
