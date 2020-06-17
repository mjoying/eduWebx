import { Component, OnInit, EventEmitter } from '@angular/core';
import { Options, CustomStepDefinition, ChangeContext } from 'ng5-slider';
import { Enums } from '../../utils/Enum';
import { UtilsGeneral } from 'src/app/utils/UtilsGeneral';
import {TranslateService, LangChangeEvent} from "@ngx-translate/core"
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionModel, Min, Day, Package } from './subscription-model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  public selectedCurrency:string;
  public enums = Enums;
  public lang : string = UtilsGeneral.getLang();
  public responseData : SubscriptionModel;
  public selectedMin : Min;
  public selectedDay : Day;
  public selectedPack : Package;
  
  minuteValue: number = 0;
  weeklyValue: number = 0;
  minuteOption: Options = {
    showTicksValues: true,
    stepsArray: [
    ],
    translate: (value: number): string => {
      return '$' + value;
    }
  };
  weeklyOption: Options = {
    showTicksValues: true,
    stepsArray: [ ],
    translate: (value: number): string => {
      return '$' + value;
    }
  };



  constructor(private translate: TranslateService, private service:SubscriptionsService, private router: Router) {
    translate.onLangChange.subscribe(lang=>{
        this.lang = lang.lang;
        this.lang == "tr" ?  this.selectedCurrency = "lira" :  this.selectedCurrency = "dollar";
      });
   }
  

  ngOnInit() {
    this.getPackageData();
    this.lang == "tr" ?  this.selectedCurrency = "lira" :  this.selectedCurrency = "dollar";
  }

  getPackageData(){
    this.service.getPackageDetail().subscribe((data: SubscriptionModel) => {
        this.responseData = data;
        this.selectMin(data.min[0].val);
      }
    );
  }


  hasCurrency(currency:string ){
    let first:string;
    if(!this.selectedDay) return true;

    for (const pack of this.selectedDay.packages) {
        for (const val of pack.values) {
            if(!first) first = val.key
            if(val.key === currency) return true;
        }
    }
    if(currency == this.selectedCurrency){
        this.selectedCurrency = first;
    }
    return false;
  }
  
  showPack(pack:Package ){
    for (const pc of pack.values) {
        if(pc.key == this.selectedCurrency) return true;
    }
    return false;
  }


 
  


  selectMin(val:number){
    let arr:CustomStepDefinition[] = [];
      for (const minuteObj of this.responseData.min) {
        arr.push({value: minuteObj.val, legend: minuteObj.val + this.enums.lang[this.lang].min});
        if(minuteObj.val == val){
          this.selectedMin = minuteObj;
          this.selectDay(minuteObj.days[0].val);
        }
      }
      const newOptions: Options = Object.assign({}, this.minuteOption);
      newOptions.stepsArray = arr;
      this.minuteOption = newOptions;
      this.weeklyValue = 0;
  }

  selectDay(val:number){
    let arr:CustomStepDefinition[] = [];
      for (const daysObj of this.selectedMin.days) {
        arr.push({value: daysObj.val, legend: daysObj.val + this.enums.lang[this.lang].day});
          if(daysObj.val == val){
            this.selectedDay = daysObj;
          }
      }
      const newOptions: Options = Object.assign({}, this.weeklyOption);
      newOptions.stepsArray = arr;
      this.weeklyOption = newOptions;
  }


  selectPackage(id:number){
      for (const packObj of this.selectedDay.packages) {
          if(packObj.productId == id){
            this.selectedPack = packObj;
          }
      }
  }

  changeMin(changeContext: ChangeContext): void {
    this.selectMin(changeContext.value);
  }
  
  changeDay(changeContext: ChangeContext): void {
    this.selectDay(changeContext.value);
  }

  gotoBuy(id:number){
    this.selectPackage(id);
    for (let index = 0; index < this.selectedPack.values.length; index++) {
      if(this.selectedPack.values[index].key != this.selectedCurrency) this.selectedPack.values.splice(index,1);
    }
   
    UtilsGeneral.setSelectedPackageInfo(this.selectedPack,this.selectedCurrency);
    this.router.navigate(['checkout']);
  }

}
