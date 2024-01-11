import { LightningElement, api, track, wire } from 'lwc';
import siteImage from "@salesforce/resourceUrl/siteImage";


export default class CartPopMenu extends LightningElement {
    i3 = `${siteImage}/siteImage/i3.jpg`;
     @track cartList = [];
connectedCallback() {
        let storedCartList = localStorage.getItem("cartList");
        if (storedCartList) {
          this.cartList = JSON.parse(storedCartList);
        }
        window.addEventListener('storage', this.handleStorageChange.bind(this));

      }
      handleStorageChange(event) {
              // localStorage'da cartList değiştiğinde tetiklenir
              if (event.key === 'cartList') {
                  this.cartList = JSON.parse(event.newValue);
              }
          }



      get numberofItemOnCart() {
          return this.cartList.length;
        }
        popcartClose() {
            const cartpopClose = this.template.querySelector(".cartPopSection");
            cartpopClose.style.display = "none";
          }
          get popTotal() {
            return this.cartList.reduce(
              (total, product) => total + parseFloat(product.price * product.count),
              0
            );
          }

}