import { expect, Locator, Page } from "@playwright/test";

export class Tie {
  readonly page: Page;
  readonly menuLink: Locator;
  readonly citaLink: Locator;
  readonly aceptBtn: Locator;
  readonly submitBtnOne: Locator;
  readonly selectProvince: Locator;
  readonly aceptProvince: Locator;
  readonly policeDepartment: Locator;
  readonly aceptDate: Locator;
  readonly entra: Locator;
  readonly nieInput: Locator;
  readonly nameTnput: Locator;
  readonly subLink: Locator;
  readonly failedReserve:Locator

  constructor(page: Page) {
    this.page = page;
    this.menuLink = page.getByRole('link', { name: 'Procedimientos ' });
    this.subLink = page.getByRole('link', { name: ' Extranjería Procedimientos' });
    this.citaLink = page.getByRole('link', { name: 'Cita Previa de Extranjería' });
    this.aceptBtn = page.getByRole('button', { name: 'Acceder al Procedimiento' });
    this.submitBtnOne = page.getByRole('button', { name: 'Aceptar' });
    this.selectProvince = page.getByLabel('PROVINCIAS DISPONIBLES');
    this.aceptProvince = page.getByRole('button', { name: 'Aceptar' });
    this.policeDepartment = page.getByLabel('TRÁMITES POLICÍA NACIONAL');
    this.entra = page.getByRole('button', { name: 'Entrar' });
    this.nieInput = page.getByRole('textbox', { name: '* N.I.E. Campo obligatorio' });
    this.nameTnput = page.getByRole('textbox', { name: '*Nombre y apellidos Campo' });
    this.failedReserve = page.getByText('Información: En este momento');
}

async navigate(path: string = " ") {
    await this.page.goto(path);
    await this.page.waitForTimeout(3000)
  }

  async goToUserDate(){
    // await this.menuLink.click();
    // await this.subLink.click();
    await this.citaLink.click();
    await this.aceptBtn.click();
    await this.submitBtnOne.click({timeout:10000});
    await this.selectProvince.selectOption('/icpplus/citar?p=12&locale=es');
    await this.submitBtnOne.click();
    await this.policeDepartment.selectOption('4112');
    await this.submitBtnOne.click();
    await this.entra.click();
  };

  async fillDate(nie:string,name:string){
    await this.nieInput.fill(nie);
    await this.nameTnput.fill(name);
    await this.submitBtnOne.click();
  }

async checkAndContinueIfFormAppears() {
  const isNoDate = await this.failedReserve.isVisible({timeout:3000}).catch(() => false);

  if (isNoDate) {
    console.log('ℹ️ На даний момент немає доступних дат для запису.');
    return false; 
  }

  console.log('✅ Доступна форма для заповнення.');
  await this.page.waitForTimeout(10000);
  return true;
}

  async resultCheck(){
    const continueFill = await this.checkAndContinueIfFormAppears();
    if(continueFill)console.log("далі");
    
}
}