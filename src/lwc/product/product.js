import { LightningElement, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import siteImage from "@salesforce/resourceUrl/siteImage";
import getProductDetail from "@salesforce/apex/ProductDetailHandler.FindProductDetail";

export default class Product extends LightningElement {
  @wire(CurrentPageReference) pageRef;

  i1 = `${siteImage}/siteImage/i1.jpg`;
        @track cartList=[];

    connectedCallback() {
        let storedCartList = localStorage.getItem("cartList");
           if (storedCartList) {
             this.cartList = JSON.parse(storedCartList);
           }
        const productId = this.pageRef.state.productId;
        this.productDetailData();

        }
    @track productDetail;
    productDetailData(){
        getProductDetail({value:this.productId})

    }

    get numberofItemOnCart() {
            return this.cartList.length;
          }

}
