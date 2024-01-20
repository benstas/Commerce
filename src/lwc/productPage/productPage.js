import { LightningElement, track, api } from "lwc";
import {NavigationMixin} from 'lightning/navigation'
import siteImage from "@salesforce/resourceUrl/siteImage";
import getProduct from "@salesforce/apex/SiteProductHandler.getProducts";
export default class ProductPage extends NavigationMixin(LightningElement) {

  i3 = `${siteImage}/siteImage/i3.jpg`;
  i9 = `${siteImage}/siteImage/i9.jpg`;
  i10 = `${siteImage}/siteImage/i10.jpg`;

  //--------------------------------------------------------------------------------
  @track cartList = [];
  @track siteProducts = [];
  @track prId;
  //--------------------------------------------------------------------------------
  connectedCallback() {
    this.productData();
    let storedCartList = localStorage.getItem("cartList");
    if (storedCartList) {
      this.cartList = JSON.parse(storedCartList);
    }
  }
  //--------------------------------------------------------------------------------
  productData() {
    getProduct()
      .then((result) => {
        this.siteProducts = this.formatProducts(result);
        this.errors = undefined;
      })
      .catch((error) => {
        this.siteProducts = undefined;
        this.errors = JSON.stringify(error);
      });
  }
  formatProducts(siteProducts) {
    return siteProducts.map((siteProducts) => {
      return {
        id: siteProducts.Id,
        price: siteProducts.Price__c,
        catagory: siteProducts.Catagory__c,
        name: siteProducts.Site_Name__c,
      };
    });
  }
  get numberofItemOnCart() {
    return this.cartList.length;
  }
  //--------------------------------------------------------------------------------
  addToCart = (event) => {
    const cartpopOpen = this.template.querySelector(".cartPopSection");
    cartpopOpen.style.display = "block";
    event.preventDefault();
    let productId = event.target.dataset.productid;
    let productName = event.target.dataset.productname;
    let productPrice = event.target.dataset.productprice;

    const existingProductIndex = this.cartList.findIndex(
      (item) => item.id === productId
    );

    if (existingProductIndex !== -1) {
      this.cartList[existingProductIndex].count++;
    } else {
      this.cartList.push({
        id: productId,
        name: productName,
        price: productPrice,
        count: 1,
      });
    }
    console.log(JSON.stringify(this.cartList));
    localStorage.setItem("cartList", JSON.stringify(this.cartList));

  };

  removeFromCart(productIdToRemove) {
    this.cartList = this.cartList.filter(
      (item) => item.id !== productIdToRemove
    );
  }

  handleRemoveButtonClick(event) {
    let productIdToRemove = event.target.dataset.productid; // Silinecek ürünün ID'sini al
    this.removeFromCart(productIdToRemove); // removeFromCart fonksiyonunu çağır
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
  //--------------------------------------------------------------------------------
   handleOrderChange(event) {
          const selectedValue = event.target.value;

          switch (selectedValue) {
              case "default":
                  console.log("Default selected");
                  break;
              case "decPrice":
                  console.log("Decreasing price selected");
                  break;
              case "incPrice":
                  console.log("Increasing price selected");
                  break;
              case "comment":
                  console.log("Number of comments selected");
                  break;
              case "favorited":
                  console.log("Most favorited selected");
                  break;
              case "selling":
                  console.log("Best selling selected");
                  break;
              default:
                  console.log("Unknown selection");
          }
      }
  //--------------------------------------------------------------------------------


  navigateProductDetail(event){
      let productDetailId=event.currentTarget.dataset.productid
      localStorage.setItem("prId", productDetailId);

      this[NavigationMixin.Navigate]({
          "type": "standard__webPage",
          "attributes":{
              url: '/productdetail?productId=' + productDetailId,

          },

      });
  }


}
