import { LightningElement, track } from "lwc";
import siteImage from "@salesforce/resourceUrl/siteImage";

export default class CartPage extends LightningElement {
  i5 = `${siteImage}/siteImage/i5.jpg`;
  i9 = `${siteImage}/siteImage/i9.jpg`;
//--------------------------------------------------------------------------------
    @track cartList = [];

  //--------------------------------------------------------------------------------

  connectedCallback() {
    let storedCartList = localStorage.getItem("cartList");
    if (storedCartList) {
      this.cartList = JSON.parse(storedCartList);
    }
  }
//--------------------------------------------------------------------------------
  removeFromCart(productIdToRemove) {
    this.cartList = this.cartList.filter(
      (item) => item.id !== productIdToRemove
    );
    localStorage.setItem("cartList", JSON.stringify(this.cartList));
  }

  handleRemoveButtonClick(event) {
    let productIdToRemove = event.target.dataset.productid; // Silinecek ürünün ID'sini al
    this.removeFromCart(productIdToRemove); // removeFromCart fonksiyonunu çağır
  }
  get popTotal() {
    return this.cartList.reduce(
      (total, product) => total + parseFloat(product.price * product.count),
      0
    );
  }
  get taxTotal() {
    const taxRatio = 0.2;
    return this.popTotal * taxRatio;
  }
  get paymentTotal() {
    return this.popTotal + this.taxTotal;
  }
  decCount(event) {
    event.preventDefault();
    let productId = event.target.dataset.productid;
    const existingProductIndex = this.cartList.findIndex(
      (item) => item.id === productId
    );
    if (this.cartList[existingProductIndex].count >= 2) {
      this.cartList[existingProductIndex].count--;
      localStorage.setItem("cartList", JSON.stringify(this.cartList));
    } else {
      this.removeFromCart(productId);
      localStorage.setItem("cartList", JSON.stringify(this.cartList));
    }
  }
  incCount(event) {
    event.preventDefault();
    let productId = event.target.dataset.productid;
    const existingProductIndex = this.cartList.findIndex(
      (item) => item.id === productId
    );
    this.cartList[existingProductIndex].count++;
    localStorage.setItem("cartList", JSON.stringify(this.cartList));
  }
  get numberofItemOnCart() {
    return this.cartList.length;
  }
}
