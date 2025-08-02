import { test, expect } from '@playwright/test';
import { Tie } from '../pages/tie.page';
import { familyDate } from '../date/formDate';


  familyDate.forEach(({nieNumber, name, phone, email})=>{
    test(`nie fill for ${name}`, async ({ page }) => {
  const nie = new Tie(page);
  
  await nie.navigate();
  await nie.goToUserDate();
  await nie.fillDate(nieNumber, name);
  await nie.resultCheck();
  await page.waitForTimeout(1000);
});
  })
  




