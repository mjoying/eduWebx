import { Package } from '../components/subscriptions/subscription-model';

export class UtilsGeneral {

  static getLang(): string {
      return sessionStorage.getItem( 'lang');
  }

  static setLang(lang: string) {
    sessionStorage.setItem( 'lang', lang);
  }

  static checkLogin(): boolean {
    let response: boolean;
    if (sessionStorage.getItem('logged-in') === null || sessionStorage.getItem('logged-in') === '' || sessionStorage.getItem('logged-in') === 'unknown') {
      response = false;
    } else {
      response = true;
    }
    return response;
  }

  static setLogin() {
    sessionStorage.setItem( 'logged-in','true');
  }
  static removeLogin() {
    sessionStorage.removeItem( 'logged-in');
  }

  static setSelectedPackageInfo(pack:Package,currency:string){
    sessionStorage.setItem('selected-package',JSON.stringify(pack));
    sessionStorage.setItem('selected-currency',currency);
  }
  
  static getSelectedPackageInfo():Package{
    let result = JSON.parse(sessionStorage.getItem('selected-package'));
    return result;
  }
  
  static getSelectedCurrency():string{
    return sessionStorage.getItem('selected-currency');
  }


}
