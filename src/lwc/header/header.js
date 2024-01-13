
import { LightningElement, track } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import siteImage from '@salesforce/resourceUrl/siteImage'

export default class Header extends NavigationMixin(LightningElement) {
    logo = `${siteImage}/siteImage/logo.png`

    @track cartList=[];
    @track searchTerm;
    connectedCallback() {
        let storedCartList = localStorage.getItem("cartList");
        if (storedCartList) {
              this.cartList = JSON.parse(storedCartList);
            }
    }

    changeHandler(event){
        const inputData = event.target.value;
        this.searchTerm = inputData;
    }

    handleClick(event){
        localStorage.setItem("searchTerm", this.searchTerm);
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes":{
                "url": "/search"
            }
        })
        }
    get numberofItemOnCart() {
        return this.cartList.length;
      }

      displayCatagory(event){
              const showcatagory = this.template.querySelector('.popMenu');
//              const slider = this.template.querySelector('c-custom-carousel')
              showcatagory.style.height='85vh';
//              slider.style.width='74%';
          }
          hideCatagory(event){
              const hidecatagory = this.template.querySelector('.popMenu');
              hidecatagory.style.height='0';
//              const slider = this.template.querySelector('c-custom-carousel')
//              slider.style.width='100%';
          }

}