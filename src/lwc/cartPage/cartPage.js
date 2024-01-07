import { LightningElement, track } from "lwc";
import siteImage from "@salesforce/resourceUrl/siteImage";
import getProduct from "@salesforce/apex/ProductHandler.getProduct";

export default class CartPage extends LightningElement {
  i1 = `${siteImage}/siteImage/i1.jpg`;
  i2 = `${siteImage}/siteImage/i2.jpg`;
  i3 = `${siteImage}/siteImage/i3.jpg`;
  i4 = `${siteImage}/siteImage/i4.jpg`;
  i5 = `${siteImage}/siteImage/i5.jpg`;
  i6 = `${siteImage}/siteImage/i6.jpg`;
  i7 = `${siteImage}/siteImage/i7.jpg`;
  i8 = `${siteImage}/siteImage/i8.jpg`;
  i9 = `${siteImage}/siteImage/i9.jpg`;
  i10 = `${siteImage}/siteImage/i10.jpg`;
  i11 = `${siteImage}/siteImage/i11.jpg`;
  logo = `${siteImage}/siteImage/logo.png`;
  login = `${siteImage}/siteImage/login.png`;
  user = `${siteImage}/siteImage/user.png`;
  phone = `${siteImage}/siteImage/phone.png`;
  back = `${siteImage}/siteImage/back.png`;
  support = `${siteImage}/siteImage/customer-support.png`;
  delivery = `${siteImage}/siteImage/delivery.png`;
  payment = `${siteImage}/siteImage/payment-method.png`;
  trust = `${siteImage}/siteImage/trust.png`;
  forward = `${siteImage}/siteImage/forward.png`;

  @track cartList = [];
  connectedCallback() {
    let storedCartList = localStorage.getItem("cartList");
    if (storedCartList) {
      this.cartList = JSON.parse(storedCartList);
    }
  }

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
