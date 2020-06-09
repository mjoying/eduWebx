import { Component, OnInit, AfterViewInit, AfterViewChecked, ChangeDetectionStrategy, ViewChild, ElementRef  } from '@angular/core';
import { UtilsGeneral } from 'src/app/utils/UtilsGeneral';
import { Package, SubscriptionModel } from '../subscriptions/subscription-model';
import { Enums } from 'src/app/utils/Enum';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ToastrComponentlessModule } from 'ngx-toastr';
import { CheckoutService } from './checkout.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit,AfterViewChecked {
  public selectedPack: Package = UtilsGeneral.getSelectedPackageInfo();
  public selectedCurrency: string = UtilsGeneral.getSelectedCurrency();
  public enums = Enums;
  public lang : string = UtilsGeneral.getLang();
  public creditCartMask = [/\d/, /\d/, /\d/, /\d/,' ', /\d/, /\d/, /\d/, /\d/, ' ' ,/\d/, /\d/, /\d/,/\d/, ' ',/\d/, /\d/, /\d/,/\d/];
  public yearMask = [/\d/, /\d/, '/' , /\d/, /\d/];
  public cvvMask = [/\d/, /\d/, /\d/];
  public cardNumber:string;
  public expireDate:string;
  public installment:any;
  public cvv:string;
  public installmentArr: any[] = [];
  public label;

  @ViewChild('expireDateInput',{static : false}) expireDateInput: ElementRef;
  @ViewChild('cardNumberInput',{static : false}) cardNumberInput: ElementRef;
  @ViewChild('cvvInput',{static : false}) cvvInput: ElementRef;
  @ViewChild('installmentInput',{static : false}) installmentInput: ElementRef;

  constructor(private translate: TranslateService, private router: Router,private service: CheckoutService) {
    this.translate.onLangChange.subscribe(lang=>{
      this.createLang();
      this.lang = lang.lang;
      
    });
   }

   ngAfterViewChecked(): void {
    this.createLang();
  }

  ngOnInit() {
    this.createLang();
  }


  checkOut(){

    if(!this.cardNumber || this.cardNumber.replace("_","").length != 19){
      this.cardNumberInput.nativeElement.focus();
      return;
    }

    if(!this.expireDate){
      this.expireDateInput.nativeElement.focus();
      return;
    }
    
    let exp:string[] = this.expireDate.replace("_","").split('/');
    if(exp.length != 2 || exp[0].replace("_","").length != 2 || exp[1].replace("_","").length != 2){
      this.expireDateInput.nativeElement.focus();
      return;
    }

    if(!this.cvv || this.cvv.replace("_","").length != 3){
      this.cvvInput.nativeElement.focus();
      return;
    }
    
    if(!this.installment) {
      this.installmentInput.nativeElement.focus();
      return;
    }
    
   
    
    let request = {installment : this.installment.value , 
                  selectedProductId : this.selectedPack.productId , 
                  selectedCurrency : this.selectedCurrency,
                  cardNumber : this.cardNumber.replace(/\ /g, ""),
                  cvv : this.cvv,
                  year : exp[0],
                  month : exp[1] }
   console.log(request);
    this.service.checkOut(request).subscribe((data: any) => {
        
        alert("başarılı")
      }
    );
  }

  createLang(){
    this.installmentArr = [];
    this.installmentArr.push({value : 1 ,text :  this.translate.instant('checkout.singlePayment') });
    
    for (let index = 2; index <= this.selectedPack.month; index++) {
      this.installmentArr.push({value : index ,text : index + ' ' + this.translate.instant('checkout.installment')});
    }
      
  }

  selectIntallment(installment) {
    this.installment = installment;
  }

}
