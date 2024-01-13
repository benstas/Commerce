import { LightningElement, track } from 'lwc';
import findProduct from "@salesforce/apex/FindProductHandler.FindProduct";
import siteImage from "@salesforce/resourceUrl/siteImage";

export default class SearchPage extends LightningElement {
      i4 = `${siteImage}/siteImage/i4.jpg`;

@track siteProducts = [];
connectedCallback() {
    let storedSearchTerm = localStorage.getItem("searchTerm");
        if (storedSearchTerm) {
          this.ssTerm = storedSearchTerm;
          console.log(this.ssTerm)
        }
    this.productData();

  }
    @track ssTerm;
  productData() {
    findProduct({value:this.ssTerm})
      .then((result) => {
        this.siteProducts = this.formatProducts(result);
        this.errors = undefined;
        console.log("data came")
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
        console.log(JSON.stringify(this.siteProducts));
        console.log(this.siteProducts);
        console.log(JSON.parse(this.siteProducts));



  }

}