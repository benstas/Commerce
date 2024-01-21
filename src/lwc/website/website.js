import { LightningElement, wire, track } from 'lwc';
import siteImage from '@salesforce/resourceUrl/siteImage'
import getPopularProduct from "@salesforce/apex/SiteProductHandler.getPopularProducts";
import {NavigationMixin} from 'lightning/navigation'
import getVisitorIP from'@salesforce/apex/VisitorIPController.getVisitorIP'

export default class Website extends NavigationMixin(LightningElement) {
    i1 = `${siteImage}/siteImage/i1.jpg`
    i2 = `${siteImage}/siteImage/i2.jpg`
    i3 = `${siteImage}/siteImage/i3.jpg`
    i4 = `${siteImage}/siteImage/i4.jpg`
    i5 = `${siteImage}/siteImage/i5.jpg`
    i6 = `${siteImage}/siteImage/i6.jpg`
    i7 = `${siteImage}/siteImage/i7.jpg`
    i8 = `${siteImage}/siteImage/i8.jpg`
    i9 = `${siteImage}/siteImage/i9.jpg`
    i10 = `${siteImage}/siteImage/i10.jpg`
    i11 = `${siteImage}/siteImage/i11.jpg`
    login = `${siteImage}/siteImage/login.png`
    user = `${siteImage}/siteImage/user.png`
    phone = `${siteImage}/siteImage/phone.png`
    back = `${siteImage}/siteImage/back.png`
    support = `${siteImage}/siteImage/customer-support.png`
    delivery = `${siteImage}/siteImage/delivery.png`
    payment = `${siteImage}/siteImage/payment-method.png`
    trust = `${siteImage}/siteImage/trust.png`
    forward = `${siteImage}/siteImage/forward.png`
    imgs=[
        {"i":this.i1},
        {"i":this.i2},
        {"i":this.i3},
        {"i":this.i4},
        {"i":this.i5},
        {"i":this.i6},
        {"i":this.i7},
        {"i":this.i8},
        {"i":this.i1},
        {"i":this.i2},
        {"i":this.i3},
        {"i":this.i4},
        {"i":this.i5},
        {"i":this.i6},
        {"i":this.i7},
        {"i":this.i8},
    ]
    revimgs=[
            {"i":this.i8},
            {"i":this.i7},
            {"i":this.i6},
            {"i":this.i5},
            {"i":this.i3},
            {"i":this.i4},
            {"i":this.i5},
            {"i":this.i3},
            {"i":this.i3},
            {"i":this.i2},
            {"i":this.i1},
            {"i":this.i4},
            {"i":this.i5},
            {"i":this.i3},
            {"i":this.i4},
            {"i":this.i6},
        ]

    slides= [
                {
                    "image":this.i1,
                    "heading":"Find yourself",
                    "description":"Lorem ipsum dolor sit amet, consectetur."

                },
                {
                    "image":this.i2,
                    "heading":"Find yourself",
                    "description":"Lorem ipsum dolor sit amet, consectetur."
                },
                {
                    "image":this.i3,
                    "heading":'Find yourself',
                    "description":'Lorem ipsum dolor sit amet, consectetur.'
                }
            ]
//------------------------------------------------------------------------------------------------------------------------------------------------
    @track popularProducts = [];
    @track cartList = [];
    @track prId;
//------------------------------------------------------------------------------------------------------------------------------------------------
     connectedCallback(){
         this.popularProductData();
     }
//--------Data----------------------------------------------------------------------------------------------------------------------------------------


     popularProductData() {
         getPopularProduct()
           .then((result) => {
             this.popularProducts = this.formatProducts(result);
             this.errors = undefined;
           })
           .catch((error) => {
             this.popularProducts = undefined;
             this.errors = JSON.stringify(error);
           });
       }

     formatProducts(popularProducts) {
       return popularProducts.map((popularProducts) => {
                return {
                  id: popularProducts.Id,
                  price: popularProducts.Price__c,
                  catagory: popularProducts.Catagory__c,
                  name: popularProducts.Site_Name__c,
                };
              });
            }
//--------ClickScroll----------------------------------------------------------------------------------------------------------------------------------------

       handleBackClick() {
           this.handleGalleryScroll(-0.30);
       }

       handleForwardClick() {
           this.handleGalleryScroll(0.30);
       }

       handleBackClick2() {
           this.handleGalleryScroll(-0.30, 'gallery2');
       }

       handleForwardClick2() {
           this.handleGalleryScroll(0.30, 'gallery2');
       }

       handleGalleryScroll(scrollDirection, galleryClassName = 'gallery') {
           const viewportWidth = window.innerWidth;
           const scrollAmount = scrollDirection * viewportWidth;
           this.scrollGallery(scrollAmount, galleryClassName);
       }

       scrollGallery(change, galleryClassName) {
           const gallery = this.template.querySelector(`.${galleryClassName}`);
           const startTime = performance.now();
           const startScroll = gallery.scrollLeft;
           const duration = 1000;

           function updateGallery(timestamp) {
               const elapsed = timestamp - startTime;
               gallery.scrollLeft = easeInOut(elapsed, startScroll, change, duration);

               if (elapsed < duration) {
                   requestAnimationFrame(updateGallery);
               }
           }

           function easeInOut(t, b, c, d) {
               t /= d / 2;
               if (t < 1) return (c / 2) * t * t + b;
               t--;
               return (-c / 2) * (t * (t - 2) - 1) + b;
           }

           requestAnimationFrame(updateGallery);
       }

//-----------------------------------------------------------------------------------------------------------------------------------------------------------
       handleMouseEnter(event) {
            const clickedElement = event.target;
            const clickedClassName = clickedElement.className;
            const liList = this.template.querySelectorAll('.disCatagory li');
            liList.forEach((li)=>{
                li.style.background='none';
            });
               clickedElement.style.background = 'red';
       }
       get numberofItemOnCart() {
            return this.cartList.length;
       }
//------------Navigate--------------------------------------------------------------------------------------------------------------------------------------------
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