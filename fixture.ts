import {test as base, Page} from '@playwright/test';

export const test = base.extend<{errorProb:Page}>({errorProb: async({page}, use) => {
    page.on('response', (response) => {
        const url = response.url();
        const status = response.status();
        console.log(url, status)
    });
    await use(page);
}})