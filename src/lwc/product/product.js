import { LightningElement, track, wire, api } from 'lwc';
import {NavigationMixin} from 'lightning/navigation'
import { CurrentPageReference } from 'lightning/navigation';
import siteImage from "@salesforce/resourceUrl/siteImage";
import getProductDetail from "@salesforce/apex/SiteProductHandler.findProductDetail";
import networkId from '@salesforce/community/Id';
import basePath from '@salesforce/community/basePath';
export default class Product extends NavigationMixin(LightningElement) {


  i1 = `${siteImage}/siteImage/i1.jpg`;
        @track cartList=[];
        @track prId;
    @wire(CurrentPageReference) pageRef;
    connectedCallback() {
        let storedCartList = localStorage.getItem("cartList");
        let storedId = localStorage.getItem("prId");
        if (storedId) {
                  this.prId = storedId;
                }
       if (storedCartList) {
         this.cartList = JSON.parse(storedCartList);
       }
       this.productDetailData();
      const communityUrl = `https://${location.host}${basePath}`;
        console.log(communityUrl)
        const queryString = window.location.search;
        console.log(queryString);


        }
        @wire(CurrentPageReference)
            getpageRef(pageRef) {
                console.log('data => ', JSON.stringify(pageRef));
            }







    @track productDetail = [];
    productDetailData(){
        getProductDetail({value:this.prId})
        .then((result)=>{
            this.productDetail = this.formatProductDetail(result);
            this.errors= undefined;
             console.log(JSON.stringify(this.productDetail));
            console.log("ok")
            console.log(this.productId)

        })
        .catch((error)=>{
            this.productDetail = undefined;
            this.errors = JSON.stringify(error);
        });
    }

    formatProductDetail(productDetail){
        return productDetail.map((productDetail)=>{
            return{
                id: productDetail.Id,
                price: productDetail.Price__c,
                catagory: productDetail.Catagory__c,
                name: productDetail.Site_Name__c,
            };
        });
    }

        getPageReferenceParameters(currentPageReference) {
           if (currentPageReference) {
              let attributes = currentPageReference.attributes;
              let states = currentPageReference.state;
              this.recordId = currentPageReference.attributes.rrId
              console.log(attributes)
              console.log(states)
              console.log("this.recordId")

              }
              }

    get numberofItemOnCart() {
            return this.cartList.length;
          }

}
